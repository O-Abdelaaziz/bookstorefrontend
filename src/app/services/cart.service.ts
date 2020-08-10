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

  public calculateTotalPrice() {
    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue +=currentCartItem.quantity * currentCartItem.unit_price
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  remove(cartItem:Cartitem){
    const itemIndex=this.cartItems.findIndex(
      temCartItem=>temCartItem.id=cartItem.id
    );

    if(itemIndex>-1){
      this.cartItems.splice(itemIndex,1);
      this.calculateTotalPrice();
    }
  }

  incrementQte(cartItem:Cartitem){
    cartItem.quantity++;
    this.calculateTotalPrice();
  }

  decrementQte(cartItem:Cartitem){
    cartItem.quantity--;
    if(cartItem.quantity <= 0){
      this.remove(cartItem);
    }
    this.calculateTotalPrice();
  }
}
