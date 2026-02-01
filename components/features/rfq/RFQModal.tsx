
'use client';

import { Product } from '@/lib/types';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Need to add textarea if not present, otherwise Input
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

interface RFQModalProps {
    product: Product;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function RFQModal({ product, open, onOpenChange }: RFQModalProps) {
    const { submitRFQ, currentUser } = useAppStore();
    const router = useRouter();
    const [quantity, setQuantity] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        submitRFQ({
            type: 'product_bulk',
            buyer_id: currentUser?.id || 'u1-buyer',
            title: `Quote request for ${product.title}`,
            details: `Looking to purchase ${quantity} ${product.unit}. ${notes}`,
            target_vendor_id: product.vendor_id
        });

        setLoading(false);
        onOpenChange(false);
        router.push('/buyer/rfqs'); // Redirects to RFQ list
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Request Bulk Quote</DialogTitle>
                    <DialogDescription>
                        Get a custom price for {product.title}. Vendors usually respond within 2 hours.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="qty" className="text-right">
                            Qty ({product.unit})
                        </Label>
                        <Input
                            id="qty"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="col-span-3"
                            placeholder="e.g. 500"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="notes" className="text-right mt-2">
                            Notes
                        </Label>
                        {/* Using Input as textarea for simplicity if Textarea component missing */}
                        <Input
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="col-span-3 h-24"
                            placeholder="Delivery location, timeline, brand preferences..."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Submitting...' : 'Send Request'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
