import { Component, Output } from '@angular/core';

import { MenuType, RouteInfo } from '../../app.constants';
import {Auth} from '../../global/services';
import { appRoutes } from '../../routes';

@Component({
  selector: 'navbar',
  templateUrl: '../templates/navbar.html',
  styleUrls: ['../css/navbar.scss'],
})
export class Navbar {
  public leftMenuItems: RouteInfo[];
  public rightMenuItems: RouteInfo[];
  public brand: RouteInfo;

  // active line handler
  private active_visible: Number = 0;
  private active_position: Number = 0;
  private active_width: Number = 0;

  constructor(private auth: Auth) {
    this.leftMenuItems = appRoutes.filter(route => {
      return route.menuType === MenuType.LEFT
    });
    this.rightMenuItems = appRoutes.filter(route => {
      return route.menuType === MenuType.RIGHT
    });
    this.brand = appRoutes.filter(route => {
      return route.menuType === MenuType.BRAND
    }).pop();
  }

  public getMenuItemAnchorClasses(menuItem: RouteInfo) {
    let menuItemAnchorClass = {
      "navbar-brand": menuItem.menuType === MenuType.BRAND,
      "nav-link": menuItem.menuType === MenuType.LEFT || menuItem.menuType === MenuType.RIGHT
    }
    return menuItemAnchorClass;
  }

  public activeMove(e){
    this.active_visible = 1;
    this.active_position = e.x - e.offsetX;
    this.active_width = e.srcElement && e.srcElement.clientWidth;
  }
  
  public activeReset(){
    this.active_visible = 0;
    this.active_position = 0;
    this.active_width = 0;
  }

}