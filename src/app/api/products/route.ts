import Product from "@/model/products/model";
import connect from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId, Types } from "mongoose";
import { productPostSchema } from "@/model/products/zod-schema";
import { treeifyError } from "zod";

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

        // validate body
        const validation = productPostSchema.safeParse(body);
        if(!validation.success) {
            return new NextResponse(JSON.stringify(treeifyError(validation.error)), {status:400})
        }

        await connect();
        
        // sotre new resource
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