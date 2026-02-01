
'use client';

import { MOCK_PRODUCTS } from '@/lib/mock-db';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ShoppingCart, FileText, Share2, Heart, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const product = MOCK_PRODUCTS[0]; // Mock for prototype

    return (
        <div className="container py-8">
            <Link href="/buyer" className="flex items-center text-sm text-slate-500 hover:text-orange-600 mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Marketplace
            </Link>

            <div className="flex flex-col lg:flex-row gap-8 mb-12">
                {/* Image Gallery */}
                <div className="w-full lg:w-1/2 space-y-4">
                    <div className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden border">
                        <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                    </div>
                    <div className="flex gap-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="relative w-24 h-24 bg-slate-100 rounded-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-orange-500">
                                <Image src={product.images[0]} alt="thumbnail" fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 space-y-6">
                    <div>
                        <Badge variant="outline" className="mb-2 text-slate-500">{product.category}</Badge>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{product.title}</h1>
                        <p className="text-slate-500 mt-2">By <span className="text-orange-600 font-medium underline">BuildMate Supplies</span></p>
                    </div>

                    <div className="flex items-end gap-2 p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-3xl font-bold text-slate-900">{product.price_range}</span>
                        <span className="text-sm text-slate-500 mb-1">/ {product.unit} (excl. GST)</span>
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                        {product.description} Ideal for high-strength applications.
                        Sourced directly from manufacturer kilns to ensure consistent quality.
                    </p>

                    <div className="flex gap-4 pt-4">
                        <Button size="lg" className="flex-1 bg-orange-600 hover:bg-orange-700">
                            <ShoppingCart className="h-5 w-5 mr-2" /> Buy Now
                        </Button>
                        <Button size="lg" variant="outline" className="flex-1">
                            <FileText className="h-5 w-5 mr-2" /> Bulk Quote
                        </Button>
                        <Button size="icon" variant="ghost">
                            <Heart className="h-5 w-5" />
                        </Button>
                        <Button size="icon" variant="ghost">
                            <Share2 className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Specs */}
            <div className="max-w-3xl">
                <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableBody>
                            {product.attributes.map(attr => (
                                <TableRow key={attr.key}>
                                    <TableCell className="font-medium bg-slate-50 w-1/3">{attr.key}</TableCell>
                                    <TableCell>{attr.value}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell className="font-medium bg-slate-50">IS Standard</TableCell>
                                <TableCell>IS 12269:2013</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium bg-slate-50">Shelf Life</TableCell>
                                <TableCell>3 Months</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
