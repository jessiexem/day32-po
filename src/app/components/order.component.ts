import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderDB } from '../orderModels';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Output()
  onEdit = new Subject<string>()

  @Input()
  ordersDB!: OrderDB

  constructor() { }

  ngOnInit(): void {
  }

  edit(key: string) {
    console.log("-----edit key:", key )
    
    this.onEdit.next(key)
  }
}
