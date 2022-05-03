import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[dropdown]'
})
export class DropdownDirective implements OnInit, AfterViewInit, OnChanges{

  @Input() opened: boolean;

  @Input() parent: HTMLElement;

  hostEl;

  constructor(private renderer: Renderer2, el: ElementRef) {
    this.hostEl = el.nativeElement;
    this.hostEl.style.overflow = 'hidden';
    this.hostEl.style.display = 'flex';
    this.hostEl.style.flexDirection = 'column';
    this.hostEl.style.alignItems = 'flex-end';
  }

  ngOnInit(): void {
    this.setMaxHeight();

    if (this.parent) {
      this.parent.onclick = (a) => {
        this.opened = !this.opened;
        this.setMaxHeight()
      };
    }
  }

  ngAfterViewInit(): void {
    this.setMaxHeight();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setMaxHeight()
  }

  setMaxHeight() {
    this.hostEl.style.maxHeight = this.hostEl.style.maxHeight || '0px';
    let height = 0;
    for (let i = 0; i < this.hostEl.children.length; i++) {
      height += this.hostEl.children[i].offsetHeight;
    }
    this.hostEl.style.transition = 'max-height ' + (height / 1000) + 's ease-out';
    if (this.opened) {
      this.hostEl.style.maxHeight = height + 'px';
    } else {
      this.hostEl.style.maxHeight = '0px';
    }
  }

}
