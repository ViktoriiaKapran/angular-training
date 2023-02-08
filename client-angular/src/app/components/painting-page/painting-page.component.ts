import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Painting } from 'src/app/models/painting';
import { User } from 'src/app/models/user';
import { PaintingService } from 'src/app/services/painting.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-painting-page',
  templateUrl: './painting-page.component.html',
  styleUrls: ['./painting-page.component.scss']
})
export class PaintingPageComponent implements OnInit {
  id: string;
  painting: Painting;
  artist: User;
  imagePath: SafeResourceUrl;

  constructor(private activateRoute: ActivatedRoute, private paintingService: PaintingService,
     private sanitizer: DomSanitizer, private userService: UserService) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.paintingService.getPaintingById(this.id).subscribe((response) => {
      if (response.success) {
        this.painting = response.painting;
        this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(this.painting.image.data);
        this.userService.getUser(this.painting.userId).subscribe((userResponse) => {
          if (userResponse.success) {
            this.artist = userResponse.user;
          }
        })
      }
    });
  }
}
