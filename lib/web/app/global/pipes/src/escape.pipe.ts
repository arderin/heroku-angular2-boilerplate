import { Pipe, PipeTransform } from '@angular/core';
/*
 * escape special chars in url routings
 * * Usage:
 *   url | escape
 * Example:
 *   {{ pdp:123:xsell |  escape}}
 *   formats to: pdp%3A123%3Axsell
*/
var Window: any = window;

@Pipe({name: 'escape'})
export class EscapePipe implements PipeTransform {
  	transform(url: string): string {
	    return Window.encodeURIComponent(url);
  	}
}

@Pipe({name: 'unescape'})
export class UnescapePipe implements PipeTransform {
  	transform(str: string): string {
	    return Window.unescape(str);
  	}
}