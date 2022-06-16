import { Component, Input, OnInit } from '@angular/core';
import { Painting } from 'src/app/models/painting';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painting-card',
  templateUrl: './painting-card.component.html',
  styleUrls: ['./painting-card.component.scss']
})
export class PaintingCardComponent implements OnInit {
  @Input() painting: Painting;
  imagePath: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit(): void {
    this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(this.painting.image.data);
  }

  navigateToPaintingPage(id: string) {
    this.router.navigate(['gallery/', id]);
  }

}
