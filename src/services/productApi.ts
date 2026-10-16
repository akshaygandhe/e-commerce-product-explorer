import type { Product } from "../types/product";

export async function getProducts(): Promise<Product[]> {
    try {

        const productsUrl = 'https://fakestoreapi.com/products'

        const productResponse = await fetch(productsUrl)

        if (!productResponse.ok) {
            throw new Error("Failed to fetch all products")
        }

        const products: Product[] = await productResponse.json();

        return products;

    } catch (error) {
            throw error;
    }
}