import { Injectable } from '@angular/core';

@Injectable()
export class Utils {
  constructor() {}

  public addUrlParms(url: string, params: any){
	if(!url || !params){ return url; }

  	var urlParts = url.split("?");
	var baseUrl = urlParts[0];
	var currParams = {};

	if(urlParts.length === 2){
		currParams = urlParts[1].split("&").reduce(function(result, value){
			var parts = value.split("=");
			result[parts[0]] = parts[1];
			return result;
		},{});
	}
	for(var k in params){
		currParams[k] = encodeURIComponent(params[k]);
	}
	if(Object.keys(currParams).length > 0){
		params = [];
		for(var u in currParams){
			params.push(u+"="+currParams[u]);
		}
		baseUrl += "?" + params.join("&");
	}
	return baseUrl;
  }

}
