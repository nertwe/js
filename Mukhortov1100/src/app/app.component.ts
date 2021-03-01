import { Component } from '@angular/core';
import {
  MyProduct,
  MyProductCategory,
} from './shared/product.model';
import { ProductService } from './shared/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Каталог товаров';
  products: MyProduct[];
  myProductCategory = MyProductCategory;
  edit = false;
  productData = {
    id: 0,
    name: '',
    category: 1,
    weight: 200,
    price: 5000,
    quantity: 2,

  };
  searchStr = '';

  constructor(
    private httpProductService: ProductService, private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      let products = this.httpProductService.getAll();
      this.products = (await products === null) || (await products === undefined) ? [] : await products;
    } catch (err) {
      console.error(err);
    }

    try {
      this.products = await this.httpProductService.getAll();
    } catch (err) {
      console.log(err);
    }
  }

  async onAddProduct(product: MyProduct) {
    try {
      let id =
        this.products.length > 0
          ? this.products[this.products.length - 1].id + 1
          : 0;
          product.id = id;
      await this.httpProductService.postOne(product);
    } catch (err) {
      console.error(err);
    } finally {
      this.getData();
    }
  }

  async onEditProduct(product) {
    try {
      await this.httpProductService.putOneById(product.id, product);
    } catch (err) {
      console.error(err);
    } finally {
      this.edit = false;
      this.getData();
    }
  }

  async onDeleteById(id: number) {
    try {
      await this.httpProductService.deleteOneById(id);
    } catch (err) {
      console.error(err);
    } finally {
      this.getData();
    }
  }
  getByCategory(category: number) {
    return this.products.filter((product) => product.category === category);
  }


  onEditById(id: number) {
    let index = this.products.findIndex((product) => product.id === id);
    this.productData = {
      id: this.products[index].id,
      name: this.products[index].name,
      category: this.products[index].category,
      weight: this.products[index].weight,
      price: this.products[index].price,
      quantity: this.products[index].quantity
    }
    this.edit = true;
  }

  onCancelEdit() {
    this.edit = false;
  }
}
