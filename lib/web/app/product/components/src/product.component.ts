import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { ProductService } from '../../services';
import { Product } from '../../models/index';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
 
@Component({
    selector: 'product-list',
    templateUrl: '../../templates/product-detail.html',
    styleUrls: ['../../css/product-detail.scss']
})
 
export class ProductDetailComponent implements OnInit, OnDestroy{
    public product:  Product;

    private subParams: any;
 
    constructor(private _productAPI: ProductService, 
        private router: Router,private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.subParams = this.route.params.subscribe(params => {
            let id = params['id']; 
            this.get(id);
        });
    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
    }
    
 
   private get(id): void {
       this._productAPI
            .get(id)
            .subscribe(data =>  { 
            	this.product = data;
            },
            error => console.log(error),
            () => console.log('Get sku complete'));
    }
}