import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  totalPrice:number=0;
  totalQte:number=0;

  constructor(private cartService:CartService) {
  }

  ngOnInit(): void {
    this.upadateCartStats();
  }

  upadateCartStats(){
    this.cartService.totalPrice.subscribe(
      (price)=>{
        this.totalPrice=price;
      }
    )

    this.cartService.totalQuantity.subscribe(
      (qte)=>{
        this.totalQte=qte;
      }
    )
  }
}
