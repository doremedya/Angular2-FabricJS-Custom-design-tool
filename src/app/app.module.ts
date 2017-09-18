import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsViewerComponent } from './components/products-viewer/products-viewer.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { PrintBuilderComponent } from './components/single-product/print-builder/print-builder.component';
import { ReviewOrderComponent } from './components/single-product/review-order/review-order.component';
import { TypeFamilyComponent } from './components/single-product/type-family/type-family.component';


const ROUTES = [{
  path: '',
  component: DashboardComponent
}, {
  path: 'products',
  component: ProductsViewerComponent
}, {
  path: 'thank-you',
  component: ThankYouComponent
}, {
  path: 'single-product',
  component: SingleProductComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    SideNavbarComponent,
    TopBarComponent,
    DashboardComponent,
    ProductsViewerComponent,
    ThankYouComponent,
    SingleProductComponent,
    PrintBuilderComponent,
    ReviewOrderComponent,
    TypeFamilyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
