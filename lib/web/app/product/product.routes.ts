import { AuthGuard } from '../global/services';
import {ProductListComponent, ProductDetailComponent} from "./components";
import { MenuType, RouteInfo } from '../app.constants';

export const productRoutes: RouteInfo[] = [
  {path: 'products', component: ProductListComponent,canActivate: [AuthGuard], title: 'Products', menuType: MenuType.LEFT, image: undefined },
  {path: 'product/:id', component: ProductDetailComponent,canActivate: [AuthGuard], title: 'PDP', menuType: MenuType.HIDDEN, image: undefined },
 ];