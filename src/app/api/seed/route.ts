import connect from "@/lib/db";
import Product from "@/model/products/model";
import { faker } from "@faker-js/faker";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

const categories = [
  { name: "Smartphone", tag: "smartphone" },
  { name: "Headphones", tag: "headphones" },
  { name: "Shoes", tag: "shoes" },
  { name: "Chair", tag: "chair" },
  { name: "Watch", tag: "watch" },
  { name: "Backpack", tag: "backpack" },
];

export async function GET() {
    await connect();
        
    await Product.deleteMany({});

    const products = [];

    for (let i = 0; i < 100; i++) {
        products.push({
        title: faker.commerce.productName() + ' ' + i, // Ensure uniqueness
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500 })),
        category: faker.commerce.department(),
        imageUrl: `https://picsum.photos/seed/product${i}/600/400`,
        });
    }

    try {
        await Product.insertMany(products);
        return new NextResponse("Seeded 1000 products!", { status: 200 });
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        return new NextResponse("could not seed products: " + errorMessage, { status: 500 });
    }
}