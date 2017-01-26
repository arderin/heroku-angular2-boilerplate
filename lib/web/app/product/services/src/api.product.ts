import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/index';
import { Configuration } from '../../../app.constants';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class ProductService {
 
    private defaultLimit: string = "50";
    private actionUrl: string;
    private headers: Headers;
 
    constructor(public authHttp: AuthHttp, private _configuration: Configuration) {
        
        this.actionUrl = _configuration.ServerWithApiUrl + 'product/';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
 
    public search = (term: string, limit: string) => {
        var search = new URLSearchParams();
        var skuQ;
        search.set("limit", limit || this.defaultLimit);
        if(term.indexOf("sku=") > -1){
            skuQ = term.split("=");
            search.set('sku', skuQ[1].replace(/[, ]+/g, ",").trim());
        }else{
            search.set('name', JSON.stringify({ "$regex": term || "", "$options": "i" }));
        }

        return this.authHttp.get(this.actionUrl + "search",{ search, headers: this.headers, body: ''}).map((res) => res.json());
    }
 
    public get = (id: number) => {
        return this.authHttp.get(this.actionUrl + id, { headers: this.headers, body: '' }).map(res => res.json());
    }
 
    public Add = (itemName: string) => {
        var toAdd = JSON.stringify({ ItemName: itemName });
 
        return this.authHttp.post(this.actionUrl, toAdd, { headers: this.headers}).map(res => res.json());
    }
 
    public Update = (id: number, itemToUpdate: Product) => {
        return this.authHttp.put(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers}).map(res => res.json());
    }
 
    public Delete = (id: number) => {
        return this.authHttp.delete(this.actionUrl + id, { body: ''});
    }
}