import Product from "@/model/products/model";
import connect from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId, Types } from "mongoose";
import { productPatchSchema } from "@/model/products/zod-schema";
import { treeifyError } from "zod";

export async function GET(request: Request, context: any) {
    const params = await context.params;
    const productId = params.productId;

    try {
        await connect(); //todo: del
        
        // validate url parameter
        if (!Types.ObjectId.isValid(productId)) {
            return new NextResponse(
                JSON.stringify({message: "invalid productId"}), 
                {status: 400}
            )
        }

        const product = await Product.findById(productId);
        if (product === null) {
            return new NextResponse(JSON.stringify({message: "no product of such id"}), {status: 404});
        }

        return new NextResponse(JSON.stringify(product), {status: 200});
    } catch (err: any) {
        return new NextResponse("could not fetch the product" + err.message, {status: 500})
    }
}


export async function PATCH(request:Request, context: any) {
    const params = await context.params;
    const productId = params.productId;
    try {
        const body = await request.json();
        await connect(); //todo: del
        
        // validate url parameter
        if (!Types.ObjectId.isValid(productId)) {
            return new NextResponse(
                JSON.stringify({message: "invalid productId"}), 
                {status: 400}
            )
        }

        // validate request body
        const validation = productPatchSchema.safeParse(body);
        if(!validation.success) {
            return new NextResponse(JSON.stringify(treeifyError(validation.error)), {status:400})
        }

        // update the resource
        const updatedProduct = await Product.findOneAndUpdate(
            {_id: productId},
            body,
            {new: true}
        )
        if(updatedProduct === null) {

            return new NextResponse(JSON.stringify({message: "no product of such id"}), {status: 404});
        }

        return new NextResponse(updatedProduct, {status: 200});

    } catch (err: any) {
        return new NextResponse("could not update the product" + err.message, {status: 500})
    }
}

export async function DELETE(request:Request, context: any) {
    const params = await context.params;
    const productId = params.productId;
    try {
        await connect(); //todo: del
        
        // validate url parameter
        if (!Types.ObjectId.isValid(productId)) {
            return new NextResponse(
                JSON.stringify({message: "invalid productId"}), 
                {status: 400}
            )
        }

        // delete the resource
        const deletedProduct = await Product.findOneAndDelete(
            {_id: productId},
        )

        if(deletedProduct === null) {
            return new NextResponse(JSON.stringify({message: "no product of such id"}), {status: 404});
        }

        return new NextResponse(deletedProduct, {status: 200});

    } catch (err: any) {
        return new NextResponse("could not delete the product" + err.message, {status: 500})
    }
}