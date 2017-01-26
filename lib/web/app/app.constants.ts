import { Injectable, Type } from '@angular/core';
import { Route } from '@angular/router';

var Window: any = window;

@Injectable()
export class Configuration {
	public Server: string = "/";
	public ApiUrl: string = "api/";
	public ServerWithApiUrl = this.Server + this.ApiUrl;
	public auth0ClientID = Window.appData.auth.clientID;
	public auth0Domain = Window.appData.auth.domain;
}

export enum MenuType {
	BRAND,
	LEFT,
	RIGHT,
	HIDDEN
}

export interface RouteInfo extends Route {
	title ? : string;
	menuType ? : MenuType;
	image ? : string;
}