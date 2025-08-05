"use client";
import React, { useEffect } from "react";
import { Product } from "@/model/products/zod-schema";
import Link from "next/link";
import { addCartItem } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";

export default function Products() {
  //* direct access in server component
  // const respose = await getProducts();
  // const products: Product[] = await respose.json();

  //* use axios in server component
  // const response = await axios.get('/api/products');
  // const products: Product[] = response.data;

  const [products, setProducts] = React.useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: Product[] = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Our Products
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover our amazing collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prd) => (
            <div
              key={prd._id}
              className="group bg-card border border-border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <div className="aspect-square bg-muted/50 relative">
                  <img
                    src={prd.imageUrl}
                    alt={prd.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    {prd.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-2 line-clamp-2">
                  {prd.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {prd.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary">
                    ${prd.price || "?"}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/products/${prd._id}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group/btn"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    onClick={() => addCartItem(prd)}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg">
              Loading products...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
