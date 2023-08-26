import Product from "../entity/product";

export default class ProductService {

    static increasePrice(product: Product[], percentage: number): Product[] {
        product.forEach((product) => {
            product.changePrice(product.price + (product.price * percentage / 100));
        });
        return product;
    }
}