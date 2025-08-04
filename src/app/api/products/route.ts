import Product from "@/db/products/model";
import connect from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId, Types } from "mongoose";

export async function GET() {
    try {
        await connect();
        const products = await Product.find();
        return new NextResponse(JSON.stringify(products), {status:200})
    } catch (err: any) {

        return new NextResponse("could not fetch products" + err.message, {status: 500})
    }
}

export async function POST(request: Request){
    
    try {
        const body = await request.json();
        await connect();
        const newProduct = await new Product(body);
        await newProduct.save();

        return NextResponse.json(
            {
                "status": 201,
                "message":"Product is created",
                data: newProduct,
            }, {status: 200}
        )
    } catch (err: any) {
        return new NextResponse("could not insert the product" + err.message, {status: 500})
    }
}

export async function PATCH(request:Request) {
    try {
        const body = await request.json();
        const {productId} = body;
        await connect();
        if (!Types.ObjectId.isValid(productId)) {
            return new NextResponse("invalid product id", {status: 400})
        }
    } catch (err: any) {

    }
}