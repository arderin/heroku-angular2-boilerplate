import { NgModule }       from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AccordionModule,DatepickerModule, DropdownModule, ModalModule,TooltipModule, TimepickerModule} from "ng2-bootstrap/ng2-bootstrap";
import { DragulaModule } from "ng2-dragula/ng2-dragula";
import { HttpModule, JsonpModule } from "@angular/http";
import { FormsModule }   from "@angular/forms";
import { SimpleNotificationsModule } from 'angular2-notifications'

import {AUTH_PROVIDERS} from "angular2-jwt";
import { Configuration } from "./app.constants";
import { routing, appRouterProviders } from "./routes";
import { IfAuth } from "./global/directives"; 
import {Ng2PageScrollModule} from 'ng2-page-scroll';

/* import comonents */
import { AppComponent }   from "./app.component";
import { HomeComponent }   from "./home/components/home";
import { Navbar }  from "./navbar/components/navbar";
import { ProductListComponent, ProductDetailComponent } from "./product";
import { DebounceFilterComponent } from "./global/components/debounce.filter.component"

/* import services */
import { ProductService} from "./product/services";
import { Utils } from "./global/services";

/*import directives and pipes*/
import { FilterPipe, EscapePipe, UnescapePipe, ArrayJoinPipe, DateTimePipe } from "./global/pipes";

@NgModule({
	declarations: [
		AppComponent,
		Navbar,
		HomeComponent,
		ProductListComponent,
		ProductDetailComponent,
		IfAuth,
		DebounceFilterComponent,
		FilterPipe,
		EscapePipe,
		ArrayJoinPipe,
		DateTimePipe
	],
	imports: [
		AccordionModule,
		BrowserModule,
		DragulaModule,
		DropdownModule,
		FormsModule,
		HttpModule,
		JsonpModule,
		ModalModule,
		routing,
		SimpleNotificationsModule,
		TimepickerModule,
		TooltipModule,
		Ng2PageScrollModule,
		DatepickerModule 
	],
	providers: [
		appRouterProviders,
		AUTH_PROVIDERS,
		Configuration,
		ProductService,
		IfAuth,
		UnescapePipe,
		Utils
	],
	bootstrap: [AppComponent],
})
export class AppModule {}