import OrderItem from "./order_item";

export default class Order{

    _id: string;
    _customerId: string;
    _items: OrderItem[];
    _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]){
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
    }

    get id(): string{
        return this._id;
    }

    total(): number{
        return this._items.reduce((total, item) => total + item._price, 0);
    }

}