import {Book} from './book';

export class Cartitem {
  id:number;
  name:string;
  image_url: string
  unit_price: number;
  quantity:number;

  constructor(book:Book) {
    this.id=book.id;
    this.name=book.name;
    this.image_url=book.image_url;
    this.unit_price=book.unit_price;
    this.quantity=1;
  }
}
