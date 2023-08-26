import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface OrderItemProps {
    id: string;
    name: string;
    productId: string;
    quantity: number;
    price: number;
}

interface OrderProps {
    id: string;
    customerId: string;
    items: OrderItemProps[];
}

export default class OrderFactory {
    public static create(orderProps: OrderProps): Order {

        const items = orderProps.items.map(item => {
            return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity);
        });

        return new Order(orderProps.id, orderProps.customerId, items);
    }
}