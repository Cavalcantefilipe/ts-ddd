import Address from "./adress";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {

        expect(() => {
            let customer = new Customer("", "John Doe");
        }).toThrowError('Id is required');
    });


    it("should throw error when name is empty", () => {

        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError('Name is required');
    });

    it("should change name", () => {

        const customer = new Customer("123", "John Doe");
        customer.changeName("Jane");
        
        expect(customer.name).toBe("Jane");
    });

    it("should throw error when address is undefined when you activate a customer", () => {

        expect(() => {
        
        const customer = new Customer("123", "John Doe");
        customer.activate();
        }).toThrowError('Adrress is mandatory to activate customer');
    });


    it("should activate customer", () => {
        
        const customer = new Customer("123", "John Doe");
        const address = new Address("Street", 123, "1233-412", "City");
        customer.setAddress(address);
        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", () => {
        
        const customer = new Customer("123", "John Doe");
        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

});