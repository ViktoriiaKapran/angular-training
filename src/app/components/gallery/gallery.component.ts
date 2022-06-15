import { Component, OnInit } from '@angular/core';
import { Painting } from 'src/app/models/painting';
import { PaintingService } from 'src/app/services/painting.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  paintings: Painting[];

  constructor(private paintingService: PaintingService) { }

  ngOnInit(): void {
    this.paintingService.getPaintings().subscribe((response) => {
      if (response.success) {
        this.paintings = response.paintings;
        console.log(this.paintings);
      }
    });
  }

}
