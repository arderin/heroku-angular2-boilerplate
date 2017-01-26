import {Component, Input, Output, ElementRef, EventEmitter, OnInit} from '@angular/core';  
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'debounce-filter',
    template: '<input type="text" class="form-control" [placeholder]="placeholder" [(ngModel)]="inputValue">'
})
export class DebounceFilterComponent {  
    @Input() placeholder: string;
    @Input() delay: number = 300;
    @Input() default: string;
    @Output() value = new EventEmitter();

    public inputValue: string;
    public inputName: string;

    constructor(private elementRef: ElementRef) {
       
        const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
            .map(() => this.inputValue)
            .debounceTime(this.delay)
            .distinctUntilChanged();

        eventStream.subscribe(input => {
            this.value.emit(input);
        });
    }

    ngOnInit() {
        if(!!this.default){
          this.inputValue = this.default;
          this.value.emit(this.default);
        }
    }
}