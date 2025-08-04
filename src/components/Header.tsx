import React from 'react'
import NavButton from '@/components/NavButton';
import { Home, Package, Info, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
        
        <div className="flex h-8 items-center justify-between w-full">
            
            <div className="flex items-center gap-2">
                <NavButton href="/" label="Home" icon={Home} />

                <Link href="/" className="flex justify-center items-center gap-2 ml-0" title="Home">
                    <h1 className="hidden sm:block text-xl font-bold m-0">
                        Ecomex
                    </h1>
                </Link>
            </div>

            <div className="flex items-center">
                <NavButton href="/products" label="Products" icon={Package} />
                <NavButton href="/cart" label="Cart" icon={ShoppingCart} />
                <NavButton href="/about" label="About" icon={Info} />
            </div>

        </div>
    
    </header>
  )
}
