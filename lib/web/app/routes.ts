import { Type } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Auth, AuthGuard } from "./global/services"
import {HomeComponent} from "./home/components/home";
import { MenuType, RouteInfo } from './app.constants';
import { productRoutes } from './product';

export const appRoutes: any[]  = [
  {path: '', component: HomeComponent, title: 'Home', menuType: MenuType.BRAND, image: "/images/logo.png"},
  ...productRoutes
]

export const appRouterProviders = [
  Auth,
  AuthGuard
];

export const routing = RouterModule.forRoot(appRoutes);