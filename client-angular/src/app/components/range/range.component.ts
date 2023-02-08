import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {
  @Input() placeholder1: string;
  @Input() placeholder2: string;
  @Input() label: string;
  @Input() formControl1: FormControl;
  @Input() formControl2: FormControl;

  constructor() { }

  ngOnInit(): void {


  }

}
