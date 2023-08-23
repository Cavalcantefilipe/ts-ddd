import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/adress";

describe("Product repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John");
        const address = new Address("Street 1", 1, "12345", "City 1");
        customer.setAddress(address);
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: "John",
            street: "Street 1",
            number: 1,
            zipCode: "12345",
            city: "City 1",
            active: false,
            rewardPoints: 0,
        });

    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John");
        const address = new Address("Street 1", 1, "12345", "City 1");
        customer.setAddress(address);
        await customerRepository.create(customer);

        customer.changeName("John 2");
        await customerRepository.update(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            zipCode: customer.address.zipCode,
            city: customer.address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John");
        const address = new Address("Street 1", 1, "12345", "City 1");
        customer.setAddress(address);
        await customerRepository.create(customer);

        const foundCustomer = await customerRepository.find("123");

        expect(foundCustomer).toEqual(customer);
    });

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();

        await expect(customerRepository.find("456")).rejects.toThrowError("Customer not found");
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("123", "John");
        const address1 = new Address("Street 1", 1, "12345", "City 1");
        customer1.setAddress(address1);
        await customerRepository.create(customer1);

        const customer2 = new Customer("456", "John 2");
        const address2 = new Address("Street 2", 2, "12345", "City 2");
        customer2.setAddress(address2);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();
        
        expect(customers).toEqual([customer1, customer2]);
    });

});