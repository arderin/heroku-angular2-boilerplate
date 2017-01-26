import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services';
import { Product } from '../../models/index';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import {Router } from "@angular/router";
 
@Component({
    selector: 'product-list',
    templateUrl: '../../templates/product-list.html',
})
 export class ProductListComponent implements OnInit {
     public products: Array < Product > ;
     private cursor: string;

     constructor(private _productAPI: ProductService, private router: Router) {}

     ngOnInit() {
         //init search results
         this.search("");
     }

     public searchChanged(value) {
        this.search(value);
     }

     private search(term): void {
         this._productAPI
             .search(term, undefined)
             .subscribe(data => {
                     this.cursor = data.cursor;
                     this.products = data.result;
                 },
                 error => console.log(error),
                 () => console.log('Get all Items complete'));
     }
 }