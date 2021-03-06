import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { CustomFormsModule } from 'ng2-validation'

import { DataTableModule } from 'angular5-data-table';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthService } from './Auth/auth.service';
import { LoginComponent } from './Auth/login/login.component';
import { AuthGuard } from './Auth/auth-guard.service';
import { UserService } from './Auth/user.service';
import { AdminAuthGuard } from './Auth/admin-auth-guard.service';
import { ErrorComponent } from './Auth/error.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './shared/services/category.service';
import { ProductService } from './shared/services/product.service';
import { FormsModule } from '@angular/forms';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { ShoppingCartService } from './shared/services/shopping-cart.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ErrorComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers:
    [AuthService,
      AuthGuard,
      UserService,
      AdminAuthGuard,
      CategoryService,
      ProductService,
      ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
