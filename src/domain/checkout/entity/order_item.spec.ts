import OrderItem from "./order_item";

describe("Order Items unit tests", () => {

    it("should throw error when id is empty", () => {

        expect(() => {
            let order = new OrderItem("", "Item 1", 10, "p1", 2);
        }).toThrowError('Id is required');
    });

    it("should throw error when name is empty", () => {

        expect(() => {
            let order = new OrderItem("123", "", 10, "p1", 2);
        }).toThrowError('Name is required');
    });

    it("should throw error when price is less than 0", () => {

        expect(() => {
            let order = new OrderItem("123", "Item 1", -1, "p1", 2);
        }).toThrowError('Price must be greater than 0');
    });

    it("should throw error when quantity is less than 0", () => {

        expect(() => {
            let order = new OrderItem("123", "Item 1", 10, "p1", 0);
        }).toThrowError('Quantity must be greater than 0');
    });

    it("should throw error when productId is empty", () => {    

        expect(() => {
            let order = new OrderItem("123", "Item 1", 10, "", 2);
        }).toThrowError('Product Id is required');
    });

    it("should price Item", () => {

        let order = new OrderItem("123", "Item 1", 10, "p1", 2);
    
        expect(order.price).toBe(20);
    });

});