import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {

        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError('Id is required');
    });

    it("should throw error when customerId is empty", () => {

        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError('Customer Id is required');
    });

    it("should throw error when orderItem is empty", () => {

        expect(() => {
            let order = new Order("123", "teste", []);
        }).toThrowError('Order must have at least one item');
    });

    it("should calculate total", () => {

        let OrderItem1 = new OrderItem("123", "Item 1", 10);
        let OrderItem2 = new OrderItem("321", "Item 2", 20);
            
        let order = new Order("123", "123", [OrderItem1, OrderItem2]);
    
            expect(order.total()).toBe(30);
        });


});