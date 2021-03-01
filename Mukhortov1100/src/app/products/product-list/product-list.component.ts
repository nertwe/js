import { Component, OnInit } from '@angular/core';
import { MyProduct } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: MyProduct[];
  searchStr = '';
  countNotNull = "";
  column = "byprice";
  column1 = "";
  reverse = false;

  productForm: FormGroup;

  constructor(private HttpProductService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      let products = this.HttpProductService.getAll();
      this.products = (await products === null)||(await products === undefined) ? [] : await products;
    } catch (err) {
      console.error(err);
    }

    try {
      this.products = await this.HttpProductService.getAll();
    } catch (err) {
      console.log(err);
    }
  }

  onLinkProduct(id: number) {
    this.router.navigate([this.router.url, 'product', id]);
  }

  onAddProduct() {
    this.router.navigate([this.router.url, 'product']);
  }

  async onDelete(id: number) {
    try {
      await this.HttpProductService.deleteOneById(id);
    } catch (err) {
      console.error(err);
    }
    this.getData();
  }


  async onPlus(id) {
    try{
      let productGet = this.HttpProductService.getOneById(id);
      this.products = await productGet == null && productGet == undefined ? [] :await productGet;
      this.products['count'] = this.products['count'] + 1;
      await this.HttpProductService.putOneById(id, this.products);
      this.getData();
    } catch(err){
      console.error(err);
    }
  }

  async onMinus(id:number) {
    try{
      let productGet = this.HttpProductService.getOneById(id);
      this.products = await productGet == null && productGet == undefined ? [] :await productGet;
      if (this.products['count'] > 0)
        this.products['count'] = this.products['count'] - 1;
      await this.HttpProductService.putOneById(id, this.products);
      this.getData();
    } catch(err){
      console.error(err);
    }
  }

}
