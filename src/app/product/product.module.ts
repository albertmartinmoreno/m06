import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductsComponent } from './products/products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NamePipe } from './pipes/name.pipe';
import { PricePipe } from './pipes/price.pipe';
import { CategoryPipe } from './pipes/category.pipe';

@NgModule({
  declarations: [
    ProductsComponent,
    NamePipe,
    PricePipe,
    CategoryPipe
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})

export class ProductModule { }
