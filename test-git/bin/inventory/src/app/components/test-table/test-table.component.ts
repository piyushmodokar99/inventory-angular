import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface ProductsResult {
  status?:number;
  products?: ProductsList[];
  msg?: string;
  product?: ProductsList;
  totalListSize?:number;
}

export interface ProductsList {
  ipId?:number;
  ipCode?: string;
  ipName?: string;
  ipBrand?: string;
  ipPrice?: any;
  ipType?:string;
}

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.css']
})
export class TestTableComponent implements AfterViewInit, OnInit {
  prodResp?:ProductsResult;
  prodList?: ProductsList[];
  displayedColumns = ['ipId', 'ipCode', 'ipName', 'ipBrand', 'ipPrice', 'ipType', 'ipEdit'];
  dataSource: MatTableDataSource<ProductsList>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //
  // MatPaginator Inputs
  totalLength = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;

  // MatPaginator Output
  pageEvent: PageEvent;
  //

  constructor(private productService: ProductService, private router: Router){
    
  }

  ngOnInit() {
    
    this.productService.getProducts(0, 1000).subscribe((resp:any) => {
        this.prodResp = resp;
        console.log( "Status......  " + this.prodResp.status);
        console.log("List Size : " + this.prodResp.products.length);
        this.prodList = this.prodResp.products;
        this.dataSource = new MatTableDataSource(this.prodList);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  getProductById(ipId:any){
    console.log("Navigate to Update Product " + ipId);
    this.router.navigate(["home/update", ipId]);
    
    /* this.productService.getProductById(ipId).subscribe((resp) => {
      this.prodResp = resp;
      console.log( "getProductById Status......  " + this.prodResp.status);
      
       const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '250px',
        data: this.prodResp.product
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        //this.animal = result;
      }); 

    }); */

  }




  getPageList(event?:PageEvent){

    console.log("pageEvent.... event.pageSize : " + event.pageSize + "pageEvent.pageIndex :::: " + event.pageIndex)

    //this.productService.getProducts(this.pageEvent.pageIndex, this.pageEvent.pageSize).subscribe((resp:any) => {
    this.productService.getProducts1(event.pageIndex, event.pageSize).subscribe((resp:any) => {
      this.prodResp = resp;
      console.log( "Status......  " + this.prodResp.status);
      console.log("List Size : " + this.prodResp.products.length);
      this.prodList = this.prodResp.products;
      this.dataSource = new MatTableDataSource(this.prodList);

      this.totalLength = this.prodResp.totalListSize;

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    return event;
  }
  
}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'prod-update-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ProductsList
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



  

}