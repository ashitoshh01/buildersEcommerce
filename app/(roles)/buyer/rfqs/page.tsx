
'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, CheckCircle } from 'lucide-react';


export default function BuyerRFQsPage() {
    const { rfqs, currentUser } = useAppStore();

    const myRFQs = rfqs.filter(r => r.buyer_id === currentUser?.id);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'submitted': return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Submitted</Badge>;
            case 'quoted': return <Badge variant="default" className="bg-green-600">Quote Received</Badge>;
            case 'accepted': return <Badge variant="outline" className="border-green-600 text-green-600">Accepted</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="container py-8 max-w-4xl">
            <h1 className="text-2xl font-bold tracking-tight mb-6">My Quote Requests</h1>

            {myRFQs.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                    <FileText className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-500">No active requests found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {myRFQs.map((rfq) => (
                        <Card key={rfq.id}>
                            <CardHeader className="p-4 pb-2">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-base font-semibold">{rfq.title}</CardTitle>
                                    {getStatusBadge(rfq.status)}
                                </div>
                                <p className="text-xs text-slate-400">
                                    {new Date(rfq.created_at).toLocaleDateString()} • {rfq.id}
                                </p>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                                <p className="text-sm text-slate-600 mb-3 bg-slate-50 p-3 rounded-md border border-slate-100">
                                    "{rfq.details}"
                                </p>

                                {rfq.quotes && rfq.quotes.length > 0 && (
                                    <div className="mt-4 pt-4 border-t">
                                        <h4 className="text-sm font-semibold mb-2">Received Quotes</h4>
                                        {rfq.quotes.map(quote => (
                                            <div key={quote.id} className="flex justify-between items-center bg-green-50 p-3 rounded border border-green-100">
                                                <div>
                                                    <p className="font-bold text-green-800">₹{quote.price.toLocaleString()}</p>
                                                    <p className="text-xs text-green-600">{quote.notes}</p>
                                                </div>
                                                <Badge className="bg-green-600">View Offer</Badge>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
