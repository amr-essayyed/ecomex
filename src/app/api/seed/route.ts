import connect from "@/lib/db";
import Product from "@/model/products/model";
import { faker } from "@faker-js/faker";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function GET() {
    await connect();
        
    await Product.deleteMany({});

    const products = [];

    for (let i = 0; i < 1000; i++) {
        products.push({
        title: faker.commerce.productName() + ' ' + i, // Ensure uniqueness
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500 })),
        category: faker.commerce.department(),
        imageUrl: faker.image.url(),
        });
    }

    try {
        await Product.insertMany(products);
        return new NextResponse("Seeded 1000 products!", { status: 200 });
    } catch (err: any) {
        return new NextResponse("could not seed products" + err.message, { status: 500 });
    }
}