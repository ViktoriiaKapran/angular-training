import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Painting } from 'src/app/models/painting';
import { PaintingsParameters } from 'src/app/models/paintings-parameters';
import { PaintingService } from 'src/app/services/painting.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit {

  paintings: Painting[];
  form: FormGroup;
  parameters: PaintingsParameters;


  constructor(private paintingService: PaintingService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      price_from: [],
      price_to: [],
      width_from: [],
      width_to: [],
      height_from: [],
      height_to: [],
    });
    this.getPaintings();
    this.paintingService.getPaintingsParameters().subscribe((response) => {
      if (response.success) {
        this.parameters = response;
      }
    })
  }

  getPaintings() {
    this.paintingService.getPaintings(this.getRequestParams(this.form.value)).subscribe((response) => {
      if (response.success) {
        this.paintings = response.paintings;
      }
    });
  }

  getRequestParams(formValues: Object): Object {
    let result = {};
    Object.keys(formValues).forEach(key => {
      if (formValues[key] != null) {
        result[key] = formValues[key];
      }
    })
    return result;
  }
  clear() {
    this.form.reset();
    this.getPaintings();
  }

}
