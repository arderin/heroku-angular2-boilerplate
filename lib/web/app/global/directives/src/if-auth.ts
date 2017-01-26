
import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import { Auth } from "../../services"


@Directive({selector: '[ifAuth]'})
export class IfAuth {
  private _hasView = false;

  constructor(private _auth: Auth, private _viewContainer: ViewContainerRef, private _template: TemplateRef<Object>) {}

  @Input()
  set ifAuth(accessGroups: Array<string>) {
    let condition: boolean = false;
    let user = this._auth.getUser();

    condition = this.inGroup(accessGroups, (user && user.groups) || []);

    if (condition && !this._hasView) {
      this._hasView = true;
      this._viewContainer.createEmbeddedView(this._template);
    } else if (!condition && this._hasView) {
      this._hasView = false;
      this._viewContainer.clear();
    }
  }

  private inGroup(allowGroups, userGroups)
  {
    for(var g of allowGroups){
      if(userGroups.indexOf(g) > -1){
        return true;
      }
    }
    return false;
  }
}