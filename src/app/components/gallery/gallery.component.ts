import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, } from '@angular/router';
import { Painting } from 'src/app/models/painting';
import { PaintingsParameters } from 'src/app/models/paintings-parameters';
import { PaintingService } from 'src/app/services/painting.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {

  paintings: Painting[];
  form: FormGroup;
  parameters: PaintingsParameters;
  genresArr: string[] = ['Abstract', 'Still life', 'Landscape', 'Portrait', 'Genre art',
    'Historical', 'Animalism', 'Nude'];
  selectedGenres: string[] = [];
  paintingsCount: number;
  pageSize: number = 12;
  pageSizeOptions: number[] = [12, 24];
  currentPage: number = 1;
  loading: boolean;
  snapshot;


  constructor(private paintingService: PaintingService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      price_from: [],
      price_to: [],
      width_from: [],
      width_to: [],
      height_from: [],
      height_to: [],
    });
    this.snapshot = this.router.routerState.snapshot.root?.queryParams;
    this.form.get('price_from').setValue(this.snapshot['price_from']);
    this.form.get('price_to').setValue(this.snapshot['price_to']);
    this.form.get('width_from').setValue(this.snapshot['width_from']);
    this.form.get('width_to').setValue(this.snapshot['width_to']);
    this.form.get('height_from').setValue(this.snapshot['height_from']);
    this.form.get('height_to').setValue(this.snapshot['height_to']);
    this.selectedGenres = this.snapshot['genres'] || [];
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
      this.apply();
    });

  }

  apply() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        'genres': this.selectedGenres,
        'width_from': this.form.get('width_from')?.value,
        'width_to': this.form.get('width_to')?.value,
        'hight_from': this.form.get('hight_from')?.value,
        'hight_to': this.form.get('hight_to')?.value,
        'price_from': this.form.get('price_from')?.value,
        'price_to': this.form.get('price_to')?.value
      },
      queryParamsHandling: 'merge'
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
    // this.form.reset();
    // this.getPaintings();
    window.location.search = '';
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
