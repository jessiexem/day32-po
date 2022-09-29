import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { LineItem, Order } from '../orderModels';

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.css']
})
export class PoComponent implements OnInit, OnChanges {

  @Input()
  order!: Order

  @Output()
  onNewOrder= new Subject<Order>()

  
  _order!: Order //not sure what this does
  poForm!: FormGroup
  poItemArrayCtrl!: FormArray

  constructor(private fb : FormBuilder) { }


  ngOnChanges(changes: SimpleChanges): void {
    console.info('>>>> changes: ', changes)

    console.info('>>>> poForm.dirty::', this.poForm.dirty)

    //extra
    if (this.poForm.dirty && !confirm('You have not saved your current edit. Discard?')) {
      this.order = this._order
      return
    }

    this.poForm = this.createForm(this.order)
    this._order = this.order
  }

  ngOnInit(): void {
    this.poForm = this.createForm(this.order)
  }

  

  processOrder() {
    const order = this.poForm.value as Order
    if (!!this.order?.orderId) { //!! converts any value to a boolean
      order.orderId = this.order.orderId
    }

    this.onNewOrder.next(order) //goes to saveOrder in app.component

    this.poForm = this.createForm()
    
  }

  addPoItem() {
    // const poItem = this.fb.group({
    //   item: this.fb.control<string>('', [Validators.required,Validators.minLength(3)]),
    //   quantity: this.fb.control<number>(1, [Validators.min(1)])
    // })

    // this.poItemArrayCtrl.push(poItem)
    this.poItemArrayCtrl.push(this.createLineItem())
  }

  removePoItem(idx: number ) {
    this.poItemArrayCtrl.removeAt(idx)
  }


  private createForm(order?: Order): FormGroup {

    this.poItemArrayCtrl = this.createLineItems(order?.lineItems || [])
    //this.poItemArrayCtrl = this.fb.array(order?.lineItems || [], [Validators.min(1)])
    return this.fb.group({

      //should be same name as Model
      name: this.fb.control<string>(order?.name || '', [Validators.required, Validators.minLength(3)]),
      mobile: this.fb.control<string>(order?.mobile || '', [Validators.required, Validators.minLength(8)]),
      lineItems: this.poItemArrayCtrl
    })
  }

  private createLineItems(lineItems: LineItem[] = []) {
    return this.fb.array(lineItems.map (li => this.createLineItem(li)))
  }

  private createLineItem(li? : LineItem) {
    return this.fb.group({
      item: this.fb.control<string>( li?.item||'', [Validators.required,Validators.minLength(3)]),
      quantity: this.fb.control<number>(li?.quantity || 1, [Validators.min(1)])
    })
  }
}
