import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductsList, ProductsResult } from '../test-table/test-table.component';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit, AfterViewInit {

  constructor(private route:ActivatedRoute, private productService : ProductService, 
              private fb:FormBuilder, private router:Router) { }

  formData1:ProductsResult;
  ipId:any;

  a:any;

  updateForm = this.fb.group({
    ipId: ['', Validators.required],
    ipCode: ['', Validators.required],
    ipBrand: ['', Validators.required],
    ipName: ['', Validators.required],
    ipPrice: ['', Validators.required],
    ipType: ['', Validators.required]
  });

  selectedValue = 'Electronic';

  ipTypes = [
    {name: 'Electronic', abbreviation: 'Electronic'},
    {name: 'Grossary', abbreviation: 'Grossary'},
    {name: 'Test', abbreviation: 'Test'}
  ];

  ngOnInit(): void {
    this.ipId = this.route.snapshot.paramMap.get('id');
    console.log("ID from table : " + this.ipId);
    this.productService.getProductById(this.ipId).subscribe((resp:any) => {
      console.log(resp);
      this.formData1 = resp;

      console.log("UpdateProductComponent Data :: " + this.formData1.product.ipCode);
      //this.setValue(this.formData.ipCode);
      this.updateForm.patchValue({
        ipId: this.formData1.product.ipId,
        ipCode: this.formData1.product.ipCode,
        ipBrand: this.formData1.product.ipBrand,
        ipName: this.formData1.product.ipName,
        ipPrice: this.formData1.product.ipPrice,
        ipType: this.formData1.product.ipType,
      });
    });
    
  }

  ngAfterViewInit(){
    
  }
  

  onSubmit() {
    console.log('Thanks! ' + JSON.stringify(this.updateForm.value));
    this.productService.updateProduct(this.updateForm.value).subscribe((resp) =>{
      console.log("response for update product " + resp);
      this.router.navigate(["home/products"]);
    });
  }

}
function setValue() {
  throw new Error('Function not implemented.');
}

