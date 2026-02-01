
'use client';

import { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { RFQModal } from '@/components/features/rfq/RFQModal';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { submitRFQ } = useAppStore();
    const [rfqOpen, setRfqOpen] = useState(false);

    // handleQuickRFQ removed in favor of Modal

    return (
        <Card className="group overflow-hidden border-slate-100 bg-white transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 rounded-2xl">
            <div className="relative h-56 w-full bg-slate-50 overflow-hidden">
                <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {product.stock_status === 'low_stock' && (
                    <Badge variant="destructive" className="absolute top-3 right-3 shadow-md">
                        Low Stock
                    </Badge>
                )}
            </div>
            <CardHeader className="p-5 pb-3">
                <div className="flex justify-between items-start mb-1">
                    <p className="text-[10px] font-bold tracking-widest text-orange-600 uppercase font-sans">{product.category}</p>
                </div>
                <h3 className="font-semibold text-lg leading-snug text-slate-900 group-hover:text-orange-700 transition-colors line-clamp-2 min-h-[3.5rem] font-display">
                    {product.title}
                </h3>
            </CardHeader>
            <CardContent className="p-5 pt-0">
                <div className="flex items-baseline gap-2 mb-4 border-b border-slate-50 pb-4">
                    <span className="text-xl font-bold text-slate-900">{product.price_range}</span>
                </div>

                <div className="space-y-2 text-sm">
                    {product.attributes.slice(0, 3).map((attr) => (
                        <div key={attr.key} className="flex justify-between items-center text-xs">
                            <span className="text-slate-400 font-medium">{attr.key}</span>
                            <span className="font-medium text-slate-700">{attr.value}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="p-5 pt-0 gap-3">
                <Button variant="outline" className="flex-1 border-slate-200 hover:bg-slate-50 hover:text-orange-600 transition-colors" onClick={() => setRfqOpen(true)}>
                    Bulk RFQ
                </Button>
                <Button className="flex-1 bg-slate-900 hover:bg-orange-600 text-white shadow-lg shadow-slate-200 hover:shadow-orange-200 transition-all duration-300">
                    Buy Now
                </Button>
            </CardFooter>

            <RFQModal
                product={product}
                open={rfqOpen}
                onOpenChange={setRfqOpen}
            />
        </Card>
    );
}
