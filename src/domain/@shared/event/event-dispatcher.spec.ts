import CustomerChangeAddressEvent from "../../customer/event/customer-change-address.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import ConsoleWhenCustomerChangeAddressHandler from "../../customer/event/handler/console-when-customer-change-addres.handler";
import ConsoleWhenCustomerHasCreatedHandler from "../../customer/event/handler/console-when-customer-has-created.handler";
import SecondConsoleWhenCustomerHasCreatedHandler from "../../customer/event/handler/second-console-when-customer-has-created.handler";
import Address from "../../customer/value-object/adress";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain Event Dispatcher", () =>  {

    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("should notify event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventHandlerSpy = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product Name",
            description: "Product Description",
            price: 100
        });

        eventDispatcher.notify(productCreatedEvent);

        expect(eventHandlerSpy).toHaveBeenCalled();
    });

    it("should notify when created a customer", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new ConsoleWhenCustomerHasCreatedHandler();
        const eventHandler2 = new SecondConsoleWhenCustomerHasCreatedHandler();
        const eventHandlerSpy = jest.spyOn(eventHandler, "handle");
        const eventHandlerSpy2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "1",
            name: "Customer Name"
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(eventHandlerSpy).toHaveBeenCalled();
        expect(eventHandlerSpy2).toHaveBeenCalled();
    });


    it("should call handler when changeAddress customer", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new ConsoleWhenCustomerChangeAddressHandler();
        const eventHandlerSpy = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();

        const address = new Address("Rua 1", 123, "12345678", "Cidade 1");

        const customerChangeAddressEvent = new CustomerChangeAddressEvent({
            id: "1",
            name: "john doe",
            address: address
        });

        eventDispatcher.notify(customerChangeAddressEvent);

        expect(eventHandlerSpy).toHaveBeenCalled();
    });


});