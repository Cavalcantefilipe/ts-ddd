import Address from "./entity/adress";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "Smith");
const address = new Address("123 Main St", 2, "12345", "Anystate");
customer._address = address;
customer.activate();

const item1 = new OrderItem("123", "Item 1", 10);
const item2 = new OrderItem("456", "Item 2", 20);

const order = new Order("123", customer._id, [item1, item2]);