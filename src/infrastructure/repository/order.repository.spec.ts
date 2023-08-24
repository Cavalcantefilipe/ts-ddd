import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-items.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/adress";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";
import OrderModel from "../db/sequelize/model/order.model";
import { or } from "sequelize";

describe("Order repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel,OrderModel,OrderItemModel,ProductModel]);
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create an order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John");
        const address = new Address("Street 1", 1, "12345", "City 1");
        customer.setAddress(address);
        customer.activate();

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("222", "product", 1, "123", 100);

        const orderRepository = new OrderRepository();
        const order = new Order("123", "123", [orderItem]);

        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: orderItem.productId,
                },
            ]
        });

    });

    it("should update an order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John");
        const address = new Address("Street 1", 1, "12345", "City 1");
        customer.setAddress(address);
        customer.activate();

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        const product2 = new Product("321", "Product 2", 100);
        await productRepository.create(product);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem("222", "product", 1, "123", 100);
        const orderItem2 = new OrderItem("333", "product 2", 1, "321", 100);

        const orderRepository = new OrderRepository();
        const order = new Order("123", "123", [orderItem1]);

        await orderRepository.create(order);

        order.changeItems([orderItem1,orderItem2]);

        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: orderItem1.id,
                    name: orderItem1.name,
                    price: orderItem1.price,
                    quantity: orderItem1.quantity,
                    order_id: order.id,
                    product_id: orderItem1.productId,
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: order.id,
                    product_id: orderItem2.productId,
                },
            ]

        });

    });

    it("should find an order", async () => {
            
            const customerRepository = new CustomerRepository();
            const customer = new Customer("123", "John");
            const address = new Address("Street 1", 1, "12345", "City 1");
            customer.setAddress(address);
            customer.activate();
    
            await customerRepository.create(customer);
    
            const productRepository = new ProductRepository();
            const product = new Product("123", "Product 1", 100);
            await productRepository.create(product);
    
            const orderItem1 = new OrderItem("222", "product", 100, "123", 1);
    
            const orderRepository = new OrderRepository();
            const order = new Order("123", "123", [orderItem1]);
    
            await orderRepository.create(order);
    
            const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

            const orderFind = await orderRepository.find(order.id);

            expect(orderModel.toJSON()).toStrictEqual({
                id: orderFind.id,
                customer_id: orderFind.customerId,
                total: orderFind.total(),
                items: orderFind.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    order_id: orderFind.id,
                    product_id: item.productId,
                })),
            });
        });

        it("should throw an error when order not found", async () => {
            const orderRepository = new OrderRepository();
            
            await expect(orderRepository.find("123")).rejects.toThrow("Order not found");
        });

        it("should find all orders", async () => {
                const customerRepository = new CustomerRepository();
                const customer = new Customer("123", "John");
                const address = new Address("Street 1", 1, "12345", "City 1");
                customer.setAddress(address);
                customer.activate();
        
                await customerRepository.create(customer);
        
                const productRepository = new ProductRepository();
                const product1 = new Product("123", "Product 1", 100);
                const product2 = new Product("321", "Product 2", 200);
                await productRepository.create(product1);
                await productRepository.create(product2);
        
                const orderItem1 = new OrderItem("222", "Product 1", 100, "123", 1);
                const orderItem2 = new OrderItem("333", "product 2", 200, "321", 1);
        
                const orderRepository = new OrderRepository();
                const order1 = new Order("123", "123", [orderItem1]);
                const order2 = new Order("321", "123", [orderItem2]);
        
                await orderRepository.create(order1);
                await orderRepository.create(order2);
    
                const orders = await orderRepository.findAll();
    
                expect(orders).toEqual([order1,order2]);
            });

            it("should throw an error when update an order not found", async () => {
                const orderRepository = new OrderRepository();
                const orderItem1 = new OrderItem("222", "Product 1", 100, "123", 1);
                const order = new Order("123", "123", [orderItem1]);
                
                await expect(orderRepository.update(order)).rejects.toThrow("Order not found");
            });


});