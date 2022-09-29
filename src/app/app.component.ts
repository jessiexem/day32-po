import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PoComponent } from './components/po.component';
import {v4 as uuidv4} from 'uuid';
import { Order, OrderDB } from './orderModels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ordersDB: OrderDB = {}
  order!: Order

  ngOnInit(): void {
    
  }

  //comes from processOrder() in po.component
  saveOrder(newOrder : Order) {

    let orderId = !newOrder.orderId ? uuidv4().substring(0,8) : newOrder.orderId
    newOrder.orderId = orderId

    //save into the OrderDB map by duplicating
    this.ordersDB = {...this.ordersDB, [orderId] : newOrder}
    
    console.info("-----orderDB:", this.ordersDB)
  }

  editOrder(key: string) {
    console.info("=======in editOrder key:",key)
    this.order = this.ordersDB[key]
    console.info("order in edit:", this.order)
  }
}
