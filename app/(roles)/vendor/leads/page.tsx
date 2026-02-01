
'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useState } from 'react';
import { RFQ } from '@/lib/types';
import { CheckCircle, Clock, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VendorLeadsPage() {
    const { rfqs, respondToRFQ, currentUser } = useAppStore();
    const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
    const [quotePrice, setQuotePrice] = useState('');
    const [quoteNotes, setQuoteNotes] = useState('');

    // Filter RFQs relevant to this vendor (e.g., matching category or direct ID)
    // For prototype, show all product_bulk RFQs
    const incomingRFQs = rfqs.filter(r => r.type === 'product_bulk');

    const handleQuoteSubmit = () => {
        if (selectedRFQ && quotePrice) {
            respondToRFQ(selectedRFQ.id, parseFloat(quotePrice), quoteNotes);
            setSelectedRFQ(null);
            setQuotePrice('');
            setQuoteNotes('');
            alert('Quote sent successfully!');
        }
    };

    const hasQuoted = (rfq: RFQ) => {
        return rfq.quotes?.some(q => q.vendor_id === currentUser?.id);
    };

    return (
        <div className="container py-12 max-w-5xl">
            <div className="mb-10">
                <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900 mb-2">Incoming Enquiries</h1>
                <p className="text-slate-500 text-lg">Manage quote requests and opportunities.</p>
            </div>

            <div className="grid gap-6">
                {incomingRFQs.map(rfq => {
                    const quoted = hasQuoted(rfq);
                    return (
                        <Card key={rfq.id} className={cn(
                            "group transition-all duration-300 border hover:shadow-lg rounded-xl overflow-hidden",
                            quoted ? "bg-slate-50 border-slate-200 opacity-80" : "bg-white border-slate-200 hover:border-orange-200"
                        )}>
                            <div className="flex flex-col md:flex-row md:items-center">
                                {/* Status Strip */}
                                <div className={cn("h-full w-1.5 min-h-[4px] md:min-h-[140px]", quoted ? "bg-green-500" : "bg-orange-500")} />

                                <div className="flex-1 p-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                                                    {rfq.type.replace('_', ' ')}
                                                </Badge>
                                                <span className="text-xs text-slate-400">• {new Date(rfq.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-slate-900 font-display group-hover:text-orange-700 transition-colors">
                                                {rfq.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 mt-1">From <span className="font-medium text-slate-700">Buyer {rfq.buyer_id}</span></p>
                                        </div>

                                        {quoted ? (
                                            <div className="flex items-center text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200 shadow-sm">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                <span className="text-sm font-medium">Quote Sent</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 shadow-sm animate-pulse">
                                                <Clock className="h-4 w-4 mr-2" />
                                                <span className="text-sm font-bold">Action Needed</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-slate-700 text-sm leading-relaxed mb-6 group-hover:bg-white group-hover:shadow-inner transition-all">
                                        "{rfq.details}"
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {!quoted && (
                                            <Button onClick={() => setSelectedRFQ(rfq)} className="bg-slate-900 hover:bg-orange-600 text-white shadow-md hover:shadow-lg hover:shadow-orange-200 transition-all px-6">
                                                Submit Quote
                                            </Button>
                                        )}
                                        <Button variant="ghost" className="text-slate-500 hover:text-slate-900">View Details</Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <Dialog open={!!selectedRFQ} onOpenChange={(open) => !open && setSelectedRFQ(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Quote for: {selectedRFQ?.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Your Price (Total)</label>
                            <Input
                                type="number"
                                placeholder="e.g. 150000"
                                value={quotePrice}
                                onChange={e => setQuotePrice(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Notes / Terms</label>
                            <Textarea
                                placeholder="Includes delivery to site..."
                                value={quoteNotes}
                                onChange={e => setQuoteNotes(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleQuoteSubmit}>Send Quote</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
