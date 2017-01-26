import { Pipe, PipeTransform } from '@angular/core';
var Window: any = window;

@Pipe({name: 'join'})
export class ArrayJoinPipe implements PipeTransform {
  	transform(value: Array<any>, delimiter: string): string {
	    return value.join(delimiter);
  	}
}

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], field : string, value : string): any[] {  
        if (!items) return [];        
        return items.filter(it => it[field] == value);
    }
}