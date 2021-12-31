import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test-multi-field',
  templateUrl: './test-multi-field.component.html',
  styleUrls: ['./test-multi-field.component.css']
})
export class TestMultiFieldComponent implements OnInit {
  //Reference = https://www.itsolutionstuff.com/post/how-to-dynamically-add-and-remove-form-fields-in-angularexample.html
  
  ngOnInit(): void {
  }

  ques = [
    {qId: 1, que:"What"},{qId: 2, que:"Who"},{qId: 3, que:"Where"}
  ];

  quesArr:any [];

  showQues:boolean = false;

  name = 'Angular';

  onValueChange(val:string)
  {
    console.log(val);
    if(val === 'piyush')
    {
      this.showQues = true;
      this.quesArr = this.ques;
      this.addQuantity();
    }
  }
  
  productForm: FormGroup;
   
  constructor(private fb:FormBuilder) {
   
    this.productForm = this.fb.group({
      name: '',
      quantities: this.fb.array([]) ,
    });
  }
  
  quantities() : FormArray {
    return this.productForm.get("quantities") as FormArray
  }
   
  newQuantity(): FormGroup {
    return this.fb.group({
      ans: '',
    })
  }
   
  addQuantity() {
    for (let index = 0; index < this.quesArr.length; index++) {
      this.quantities().push(this.newQuantity());  
    }
  }
   
  removeQuantity(i:number) {
    this.quantities().removeAt(i);
  }
   
  onSubmit() {
    //console.log(this.productForm.value.quantities[0]);
    //console.log(this.productForm.value.quantities);
    var exampleArray = [];
    var i = 0;
    this.productForm.value.quantities.forEach(element => {
      exampleArray.push(this.quesArr[i].qId, element.ans); 
      i++;
    });
    
    //This is your final array to send request to server with answers
    console.log(exampleArray);
  }
}