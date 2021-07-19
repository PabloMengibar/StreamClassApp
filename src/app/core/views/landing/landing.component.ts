import { Serie } from 'src/app/series/models/serie';
import { SeriesService } from 'src/app/series/services/series.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/categories/interface/category.interface';
import { CategoriesService } from 'src/app/categories/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  emailForm: FormGroup;
  categories!: Category[];
  emailInfo: string = '';

  series: Serie[] = [];

  constructor(
    fb: FormBuilder,
    private serviceModel: SeriesService,
    private categorySvc: CategoriesService,
    private router: Router
  ) {
    this.emailForm = fb.group({
      email: [''],
    });
  }

  ngOnInit(): void {
    this.serviceModel.getSeries().subscribe((result) => {
      this.series = result;
    });
    this.categorySvc.getCategory().subscribe((x) => {
      this.categories = x;
    });
  }

  registerEmail(form: FormGroup): void {
    if (form.valid) {
      const userEmail = form.value.email;
      console.log(userEmail);
      this.router.navigate(['signup/', userEmail]);
    }
  }
}
