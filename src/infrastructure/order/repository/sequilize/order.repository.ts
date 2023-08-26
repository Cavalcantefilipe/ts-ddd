import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-items.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                order_id: entity.id,
                product_id: item.productId,
            })),
        },
        {
            include: [{model: OrderItemModel}],
        }
        );
    }

    async update(entity: Order): Promise<void> {

        const order = await OrderModel.findOne({ where: { id: entity.id } });

        if (!order) {
            throw new Error("Order not found");
        }

        await OrderModel.update({
            customer_id: entity.customerId,
            total: entity.total()
        },
        {
            where: {id: entity.id},
        });

        await OrderItemModel.destroy({
            where: {order_id: entity.id},
        });

        await OrderItemModel.bulkCreate(entity.items.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            order_id: entity.id,
            product_id: item.productId,
        })));
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({ where: { id }, include: ["items"] });
        if (!orderModel) {
            throw new Error("Order not found");
        }

        const items = orderModel.items.map(item => (new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)));
        
        const order = new Order(orderModel.id, orderModel.customer_id, items);

        return order;
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({ include: ["items"] });

        if (!orderModels) {
            return [];
        }

        const orders = orderModels.map(orderModel => {
            const items = orderModel.items.map(item => {
                const orderItem = new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
                return orderItem;
            });
            const order = new Order(orderModel.id, orderModel.customer_id, items);
            return order;
        });

        return orders;
    }
}