import Product from "../entity/product";
import ProductFactory from "./product.factory";

describe("Product factory test", () => {

    it("should create a product type a", () => {

        const product = ProductFactory.create("a", "Product 1", 100);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product 1");
        expect(product.price).toBe(100);
    });

    it("should create a product type b", () => {
            
        const product = ProductFactory.create("b", "Product 1", 100);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product 1");
        expect(product.price).toBe(200);
    });

    it("should throw error when type is invalid", () => {
                
            expect(() => {
                ProductFactory.create("c", "Product 1", 100);
            }).toThrowError("Invalid product type");
    });
});