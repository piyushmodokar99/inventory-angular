import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  isProductAdded:boolean = false;
  

  addForm = this.fb.group({
    ipId: ['', Validators.required],
    ipCode: ['', Validators.required],
    ipBrand: ['', Validators.required],
    ipName: ['', Validators.required],
    ipPrice: ['', Validators.required],
    ipType: ['', Validators.required]
  });

  ipTypes = [
    {name: 'Electronic', abbreviation: 'Electronic'},
    {name: 'Grossary', abbreviation: 'Grossary'},
    {name: 'Test', abbreviation: 'Test'}
  ];

  

  constructor(private route:ActivatedRoute, private productService : ProductService, 
    private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  addProduct()
  {
    console.log('Thanks! ' + JSON.stringify(this.addForm.value));
    this.productService.addProduct(this.addForm.value).subscribe((resp) =>{
      console.log("response for add product " + JSON.stringify(resp));
      
      
      this.isProductAdded = true;
      //this.router.navigate(["home/products"]);
    });
  }

}
