import { Component, OnInit, ViewEncapsulation, ViewContainerRef  } from "@angular/core";
import { Navbar } from './navbar/components/navbar';
import { PageScrollConfig } from 'ng2-page-scroll';

@Component({
    selector: "app",
    templateUrl: "./app.html",
    styleUrls: ['./css/main.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
     private viewContainerRef: ViewContainerRef;

    // configure simple notification settings 
    private notifConfig: any = {
        position: ["top", "right"],
        timeOut: 7000
    };
    
	constructor(viewContainerRef:ViewContainerRef) {
        PageScrollConfig.defaultDuration = 250;
        //ng2-bootstrap modal hack
        this.viewContainerRef = viewContainerRef;
    }

    ngOnInit() {
        console.log("Application component initialized ...");
    }
}