'use client';

import { Input } from '@/components/ui/input';
import { FilterState } from '@/app/(roles)/buyer/page';

interface FilterSectionProps {
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
}

export const CATEGORIES = ['Cement', 'Steel & TMT', 'Tiles & Flooring', 'Paints', 'Electrical', 'Plumbing'];

export function FilterSection({ filters, setFilters }: FilterSectionProps) {

    const handleCategoryChange = (category: string) => {
        const newCategories = new Set(filters.categories);
        if (newCategories.has(category)) {
            newCategories.delete(category);
        } else {
            newCategories.add(category);
        }
        setFilters({ ...filters, categories: newCategories });
    };

    const handlePriceChange = (type: 'min' | 'max', value: string) => {
        setFilters({
            ...filters,
            priceRange: {
                ...filters.priceRange,
                [type]: value ? parseInt(value) : undefined
            }
        });
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                {/* Categories */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-900 tracking-wide uppercase">Categories</h3>
                    <div className="flex flex-col gap-2.5 text-sm text-slate-600">
                        {CATEGORIES.map((category) => (
                            <label key={category} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={filters.categories.has(category)}
                                    onChange={() => handleCategoryChange(category)}
                                    className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-200"
                                />
                                <span className={filters.categories.has(category) ? "font-medium text-orange-600" : "group-hover:text-orange-600 transition-colors"}>
                                    {category}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3 pt-2">
                    <h3 className="text-sm font-semibold text-slate-900 tracking-wide uppercase">Price Range</h3>
                    <div className="flex gap-3">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={filters.priceRange.min || ''}
                            onChange={(e) => handlePriceChange('min', e.target.value)}
                            className="h-9 text-xs bg-white border-slate-200 focus:border-orange-300 transition-colors"
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={filters.priceRange.max || ''}
                            onChange={(e) => handlePriceChange('max', e.target.value)}
                            className="h-9 text-xs bg-white border-slate-200 focus:border-orange-300 transition-colors"
                        />
                    </div>
                </div>

                {/* Availability */}
                <div className="space-y-3 pt-2">
                    <h3 className="text-sm font-semibold text-slate-900 tracking-wide uppercase">Availability</h3>
                    <div className="flex flex-col gap-2 text-sm text-slate-600">
                        <label className="flex items-center gap-3 group cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.inStockOnly}
                                onChange={(e) => setFilters({ ...filters, inStockOnly: e.target.checked })}
                                className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-200"
                            />
                            <span className="group-hover:text-orange-600 transition-colors font-medium">In Stock Only</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
