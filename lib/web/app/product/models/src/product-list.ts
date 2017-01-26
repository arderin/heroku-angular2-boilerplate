import { Product } from './product';

export class ProductList {

	constructor(public count: number,
		 public cursor: string,
		 public results: Array<Product>
	 ) {

	}


}