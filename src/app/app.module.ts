import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PoComponent } from './components/po.component';
import { OrderComponent } from './components/order.component';

@NgModule({
  declarations: [
    AppComponent,
    PoComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
