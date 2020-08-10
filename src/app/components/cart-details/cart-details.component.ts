import { Component, OnInit } from '@angular/core';
import { Cartitem } from 'src/app/models/cartitem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartItems: Cartitem[] = [];
  totalPrice: number = 0;
  totalQte: number = 0;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails(){
    this.cartItems=this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      (data)=>{
        this.totalPrice=data;
      }
    )

    this.cartService.totalQuantity.subscribe(
      (data)=>{
        this.totalQte=data;
      }
    )

    this.cartService.calculateTotalPrice();
  }

  remove(cartItem:Cartitem){
      this.cartService.remove(cartItem);
  }

  incrementQte(cartItem:Cartitem){
    this.cartService.incrementQte(cartItem);
  }

  decrementQte(cartItem:Cartitem){
    this.cartService.decrementQte(cartItem);
  }
}
