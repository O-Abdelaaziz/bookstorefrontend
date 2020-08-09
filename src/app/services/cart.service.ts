import {Injectable} from '@angular/core';
import {Cartitem} from '../models/cartitem';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: Cartitem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {
  }

  addToCart(theCartItem:Cartitem){
    let alreadyExistInCart:boolean=false;
    let existingCartItem:Cartitem=undefined;

    if (this.cartItems.length >0){
      existingCartItem=this.cartItems.find(tempCartItems=>tempCartItems.id===theCartItem.id);
      alreadyExistInCart=(existingCartItem !=undefined);
    }

    if(alreadyExistInCart){
      existingCartItem.quantity++;
    }else {
      this.cartItems.push(theCartItem);
    }

    this.calculateTotalPrice();
  }

  private calculateTotalPrice() {
    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue +=currentCartItem.quantity * currentCartItem.unit_price
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
