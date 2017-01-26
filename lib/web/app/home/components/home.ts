import {Component} from "@angular/core";
import {Input} from "@angular/core";
import {Output} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {Auth} from '../../global/services';

@Component({
    selector: 'home',
    templateUrl: '../templates/index.html',
  	styleUrls: ['../css/home.scss'],
})
export class HomeComponent {
  constructor(private auth: Auth) {
  }
}
