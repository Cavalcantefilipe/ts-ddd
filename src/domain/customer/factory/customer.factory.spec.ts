import Address from "../value-object/adress";
import CustomerFactory from "./customer.factory";

describe("customer factory test", () => {

    it("should create a customer", () => {
        let customer = CustomerFactory.create("John");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeUndefined();

    });

    it("should create a customer with address", () => {
        const address = new Address("Street 1", 1, "12345", "City 1");
        let customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeDefined();
        expect(customer.address.street).toBe("Street 1");
        expect(customer.address.number).toBe(1);
        expect(customer.address.zipCode).toBe("12345");
        expect(customer.address.city).toBe("City 1");
    });

});