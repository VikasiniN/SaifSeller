import { Component, OnInit,  ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { ProductService } from '../product.service';
import { Product } from '../add-product/product.model';

export interface PeriodicElement {
  primeImage: string;
  productName: string;
  styleCode: string;
  skuCode: string;
  view: string;
  edit: string;
  delete: string;
}
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['primeImage', 'productName', 'styleCode', 'skuCode', 'view', 'edit', 'delete'];
  productModel: Product[];
  productData;
  message;
  action;

  /* public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  dataSource: any = [];
  array: any;
  temp: any = []; */
  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.productData = new MatTableDataSource<PeriodicElement>(data);
      this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
    }, err => {
      console.log(err);
    });
  }
  applyFilter(filterValue: string) {
    this.productData.filter = filterValue.trim().toLowerCase();
  }
  deleteProduct(product) {
    this.message = 'Product deleted';
    this.productService.deleteProduct(product).subscribe(data => {
      this.productData = new MatTableDataSource<PeriodicElement>(data);
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
    }, err => {
      console.log(err);
    });
  }
  viewProduct(product) {
    this.router.navigate(['/product/productdetail', product._id ]);
  }
  editProduct(element) {
    this.router.navigate(['/product/editproduct', element._id ]);
  }
}
