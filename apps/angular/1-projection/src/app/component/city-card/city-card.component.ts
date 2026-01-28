import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [onAdd]="onAdd"
      [onDelete]="onDelete"
      [getName]="getName"
      customClass="bg-light-red">
      <img card-image ngSrc="assets/img/city.png" width="200" height="200" />
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
})
export class CityCardComponent implements OnInit, OnChanges {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  onAdd = () => {
    const city = randomCity();
    this.store.addOne(city);
  };

  getName(city: City) {
    return city.name;
  }

  ngOnChanges(): void {
    console.log(this.cities());
  }
  onDelete = (id: number) => {
    this.store.deleteOne(id);
  };
  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
  }
}
