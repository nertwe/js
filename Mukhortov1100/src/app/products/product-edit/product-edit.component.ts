import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyProduct, MyProductCategory } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id: number;
  // code: ;
  // price: ;
  // producer: ;
  // category: ;
  // weight: ;
  // quantity: ;
  product: MyProduct;
  productForm: FormGroup;
  myProductCategory = MyProductCategory;

  constructor(
    private activatedRouter: ActivatedRoute,
    private HttpProductService: ProductService,
    private router: Router
  ) {
    this.activatedRouter.params.subscribe((param) => {
      this.id = param.id;
    });
   }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      code: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required,
        Validators.pattern('[0-9]+')]),
      producer: new FormControl(null),
      category: new FormControl(0, [Validators.required]),
      weight: new FormControl(null, [Validators.required,
        Validators.pattern('[0-9]+')]),
      quantity: new FormControl(null, [Validators.pattern('[1-9]+[0-9]*')])
      
    });
    this.getData();
  }

  async getData() {
    if ((this.id !== null)&&(this.id !== undefined)) {
      try {
        let product = this.HttpProductService.getOneById(this.id);
        this.product = await product;
      } catch (err) {
        console.error(err);
      }
      this.productForm.patchValue({
        name: this.product.name,
        code: this.product.code,
        price: this.product.price,
        producer: this.product.producer,
        category: this.product.category,
        weight: this.product.weight,
        quantity: this.product.quantity
      });
    }
  }

  async onSave() {
    if ((this.id !== null)&&(this.id !== undefined)) {
      try {
        await this.HttpProductService.putOneById(this.id, this.productForm.value);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        let res = await this.HttpProductService.postOne(this.productForm.value);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch (err) {
        console.error(err);
      }
    }
  }

  async onDelete() {
    try {
      await this.HttpProductService.deleteOneById(this.id);
    } catch (err) {
      console.error(err);
    }
    this.router.navigate(['/products']);
  }

}
