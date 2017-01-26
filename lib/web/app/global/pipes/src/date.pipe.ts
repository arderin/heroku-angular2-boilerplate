import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';
import 'moment-timezone';

@Pipe({name: 'datetime'})
export class DateTimePipe implements PipeTransform {
  	transform(dateTime: Date, timezone: string, dtFormat: string): string {
	    return moment.tz(dateTime, timezone).format(dtFormat);
  	}
}

