import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SecondConsoleWhenCustomerHasCreatedHandler implements EventHandlerInterface <CustomerCreatedEvent> {

    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated");
    }
}