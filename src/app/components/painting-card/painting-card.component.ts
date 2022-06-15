import { Component, Input, OnInit } from '@angular/core';
import { Painting } from 'src/app/models/painting';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-painting-card',
  templateUrl: './painting-card.component.html',
  styleUrls: ['./painting-card.component.scss']
})
export class PaintingCardComponent implements OnInit {
  @Input() painting: Painting;
  imagePath: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(this.painting.image.data);
  }

}
