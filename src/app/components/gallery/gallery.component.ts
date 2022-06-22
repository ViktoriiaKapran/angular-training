import { TitleCasePipe } from '@angular/common';
import { ArrayType } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_CALENDAR_RANGE_STRATEGY_PROVIDER } from '@angular/material/datepicker/date-range-selection-strategy';
import { Painting } from 'src/app/models/painting';
import { PaintingsParameters } from 'src/app/models/paintings-parameters';
import { PaintingsResponse } from 'src/app/models/paintings-response';
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
  genres: string[] = ['Abstract', 'Still life', 'Landscape', 'Portrait', 'Genre art',
    'Historical', 'Animalism', 'Nude'];
  selectedGenres: string[] = [];
  paintingsCount: number;
  pageSize: number = 12;
  pageSizeOptions: number[] = [12, 24];
  currentPage: number = 1;
  loading: boolean;


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
    this.loading = true;
    this.paintingService.getPaintings(this.getRequestParams(this.form.value)).subscribe((response) => {
      if (response.success) {
        this.paintings = response.paintings;
        this.paintingsCount = response.count;
      }
      this.loading = false;
    });
  }

  getRequestParams(formValues: Object): Object {
    let result = {};
    Object.keys(formValues).forEach(key => {
      // set only filled fields
      if (formValues[key] != null) {
        result[key] = formValues[key];
      }
    });
    if (this.selectedGenres.length) {
      result['genres'] = this.selectedGenres.join(',');
    }
    result['page'] = this.currentPage;
    result['limit'] = this.pageSize;
    return result;
  }

  clear() {
    this.form.reset();
    this.getPaintings();
  }

  setSelectedGenres(selectedGenre: string) {
    if (this.selectedGenres.indexOf(selectedGenre) == -1) {
      this.selectedGenres.push(selectedGenre);
    } else {
      this.selectedGenres = this.selectedGenres.filter(genre => genre != selectedGenre);
    }
  }

  onPageChange(event) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getPaintings();
  }

}
