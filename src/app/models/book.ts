export class Book {
    id: number;
    sku: string
    name: string
    description: string
    unit_price: number;
    image_url: string
    active: boolean;
    promotion: boolean;
    selected: boolean
    units_in_stock: number;
    date_created: Date;
    last_updated: Date;
}
