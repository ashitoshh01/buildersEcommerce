'use client';

import { useAppStore } from '@/lib/store';
import { ProductCard } from '@/components/features/catalog/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, ShoppingCart, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator'; // I forgot to install separator, might simulate or use div
import { MOCK_PRODUCTS } from '@/lib/mock-db';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';


import { useState, useMemo } from 'react';
import { FilterSection } from '@/components/features/marketplace/FilterSection';

export interface FilterState {
    categories: Set<string>;
    priceRange: { min?: number; max?: number };
    inStockOnly: boolean;
}

export default function MarketplacePage() {
    // State for searching and filtering
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<FilterState>({
        categories: new Set(),
        priceRange: {},
        inStockOnly: false,
    });

    // Filtering Logic
    const filteredProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter(product => {
            // Search Text
            if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase()) && !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            // Categories
            if (filters.categories.size > 0 && !filters.categories.has(product.category)) {
                return false;
            }
            // Price Range
            if (filters.priceRange.min !== undefined && product.price < filters.priceRange.min) return false;
            if (filters.priceRange.max !== undefined && product.price > filters.priceRange.max) return false;

            // Stock
            if (filters.inStockOnly && product.stock <= 0) return false;

            return true;
        });
    }, [searchQuery, filters]);

    const activeFilterCount = filters.categories.size + (filters.inStockOnly ? 1 : 0) + (filters.priceRange.min ? 1 : 0) + (filters.priceRange.max ? 1 : 0);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                {/* Mobile Filter Trigger */}
                <div className="lg:hidden mb-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                                <span className="flex items-center"><Filter className="h-4 w-4 mr-2" /> Filters</span>
                                {activeFilterCount > 0 && (
                                    <span className="text-xs text-orange-600 bg-orange-50 font-bold px-2 py-0.5 rounded-full">{activeFilterCount} Active</span>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] overflow-y-auto">
                            <div className="py-6">
                                <h2 className="font-display font-bold text-xl mb-6">Filters</h2>
                                <FilterSection filters={filters} setFilters={setFilters} />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop Sidebar Filters */}
                <aside className="hidden lg:block w-64 space-y-8 flex-shrink-0">
                    <div className="sticky top-24 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="font-display font-bold text-xl flex items-center text-slate-900">
                                    <Filter className="h-5 w-5 mr-3 text-orange-600" />
                                    Filters
                                </h2>
                                {activeFilterCount > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-auto p-0 text-xs text-orange-600 hover:bg-transparent hover:text-orange-700 hover:underline"
                                        onClick={() => setFilters({ categories: new Set(), priceRange: {}, inStockOnly: false })}
                                    >
                                        Reset
                                    </Button>
                                )}
                            </div>
                            <div className="h-px bg-slate-200" />

                            <FilterSection filters={filters} setFilters={setFilters} />
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Search Header */}
                    <div className="flex gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 items-center transition-shadow shadow-slate-200 hover:shadow-md">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input
                                placeholder="Search for cement, sand, steel..."
                                className="pl-12 h-12 bg-transparent border-none shadow-none text-base focus-visible:ring-0 placeholder:text-slate-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="w-px h-8 bg-slate-200 hidden sm:block" />
                        <Button variant="ghost" className="hidden sm:flex hover:bg-slate-50 text-slate-600 font-medium">Sort by: Relevance</Button>
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900">Construction Materials</h1>
                        <span className="text-sm text-slate-500">{filteredProducts.length} results found</span>
                    </div>

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-10">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                            <div className="mx-auto h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                <Search className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">No products found</h3>
                            <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                            <Button
                                variant="outline"
                                className="mt-6"
                                onClick={() => {
                                    setSearchQuery('');
                                    setFilters({ categories: new Set(), priceRange: {}, inStockOnly: false });
                                }}
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
