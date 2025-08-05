"use client";
import React, { use, useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/model/products/zod-schema";
import { addCartItem } from "@/lib/cart";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

async function getProduct(productId: string): Promise<Product | null> {
  try {
    const response = await fetch(`/api/products/${productId}`);

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default function ProductPage() {

    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    console.log("Product ID from params:", params.productId);
    const productId = params.productId as string;

    useEffect(() => {
        const fetchProduct = async () => {
            const product: Product | null = await getProduct(productId);

            if (!product) {
                notFound();
            } else {
                setProduct(product);
            }
        };

        fetchProduct();
    }, [productId]);

    return (
        <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            {product && product.imageUrl ? (
                <img
                src={product.imageUrl || ""}
                alt={product.title || "Product image"}
                className="object-cover"
                />
            ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    </div>
                    <p>No image available</p>
                </div>
                </div>
            )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
            {/* Category */}
            {product?.category && product.category !== "uncategorized" && (
                <div className="text-sm text-gray-600 uppercase tracking-wide">
                {product.category}
                </div>
            )}

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">{product?.title}</h1>

            {/* Price */}
            <div className="text-3xl font-bold text-green-600">
                ${product?.price?.toFixed(2) || "0.00"}
            </div>

            {/* Description */}
            {product?.description && (
                <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                    {product.description}
                </p>
                </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
                <Button size="lg" className="w-full" onClick={() => addCartItem(product!)}>
                Add to Cart
                </Button>
            </div>

            {/* Product Meta */}
            <div className="border-t pt-6 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                <span>Product ID:</span>
                <span className="font-mono">{product?._id}</span>
                </div>
                {product?.createdAt && (
                <div className="flex justify-between">
                    <span>Added:</span>
                    <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                </div>
                )}
            </div>
            </div>
        </div>

        {/* Additional Product Information */}
        <div className="mt-12 border-t pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                </svg>
                </div>
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-gray-600 text-sm">
                Free shipping on orders over $50
                </p>
            </div>

            <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                </div>
                <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-gray-600 text-sm">30-day money back guarantee</p>
            </div>

            <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"
                    />
                </svg>
                </div>
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600 text-sm">
                Customer support available anytime
                </p>
            </div>
            </div>
        </div>
        </div>
    );
}
