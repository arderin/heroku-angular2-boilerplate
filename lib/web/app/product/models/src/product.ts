export class Product {

	constructor(public _id: string,
		 public sku: string,
		 public name: string,
		 public imageUrl: string,
		 public linkUrl: string,
		 public brand: string,
		 public categories: Array<any>,
		 public offers: Array<any>,
		 public ksps: Array<any>
		 public listPrice: number,
		 public salePrice: number
	 ) {

	}


}