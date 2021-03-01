import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { CategoryPipe } from '../shared/pipes/category.pipe';
import { SortPipe } from '../shared/pipes/sort.pipe';



@NgModule({
  declarations: [ProductsComponent,
    ProductListComponent,
    ProductEditComponent,
    CategoryPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
