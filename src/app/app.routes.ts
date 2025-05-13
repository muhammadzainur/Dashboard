import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChartComponent } from './pages/chart/chart.component';
import { FormComponent } from './pages/form/form.component';
import { TableComponent } from './pages/table/table.component';
import { ButtonComponent } from './pages/button/button.component';
import { ChatComponent } from './pages/chat/chat.component';
import { TreeComponent } from './pages/tree/tree.component';
import { OverlayComponent } from './pages/overlay/overlay.component';
import { DetailProductComponent } from './pages/home/detail-product/detail-product.component';
import { ProductComponent } from './pages/home/product/product.component';
import { ShoppingCartComponent } from './pages/home/shopping-cart/shopping-cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'charts', component: ChartComponent },
  { path: 'forms', component: FormComponent },
  { path: 'tables', component: TableComponent },
  { path: 'buttons', component: ButtonComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'tree', component: TreeComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'overlay', component: OverlayComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: DetailProductComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
];
