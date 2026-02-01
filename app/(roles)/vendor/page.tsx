"use client";

import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, MessageSquare, TrendingUp, Plus, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function VendorPage() {
    const { rfqs, currentUser } = useAppStore();

    // Derived state
    const incomingEnquiries = rfqs.length;
    const quotesSent = rfqs.filter(r => r.quotes?.some(q => q.vendor_id === currentUser?.id)).length;
    const pendingAction = incomingEnquiries - quotesSent;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-display font-bold tracking-tight text-slate-900 mb-2">Vendor Portal</h1>
                    <p className="text-lg text-slate-500">Overview of your inventory and sales performance.</p>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200" size="lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Product
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card className="bg-white border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Inventory</span>
                            <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Package className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 font-display">124</div>
                        <div className="flex items-center text-sm text-green-600 mt-2 font-medium">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            +12% this month
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Incoming Enquiries</span>
                            <div className="h-10 w-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                                <MessageSquare className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 font-display">{incomingEnquiries}</div>
                        <div className="flex items-center text-sm text-slate-400 mt-2">
                            Across 4 categories
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Pending Quotes</span>
                            <div className="h-10 w-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                                <Clock className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 font-display">{pendingAction}</div>
                        <div className="flex items-center text-sm text-orange-600 mt-2 font-medium">
                            Requires attention
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity / Quick Links */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Recent RFQs */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-display font-bold text-slate-900">Recent Enquiries</h2>
                        <Link href="/vendor/leads" className="text-orange-600 font-medium hover:text-orange-700 text-sm flex items-center">
                            View All <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        {rfqs.slice(0, 3).map((rfq, i) => {
                            const isQuoted = rfq.quotes?.some(q => q.vendor_id === currentUser?.id);
                            return (
                                <div key={rfq.id} className={`p-4 flex items-center justify-between hover:bg-slate-50 transition-colors ${i !== 2 ? 'border-b border-slate-50' : ''}`}>
                                    <div>
                                        <div className="font-semibold text-slate-900 mb-0.5">{rfq.title}</div>
                                        <div className="text-xs text-slate-500 flex items-center">
                                            {new Date(rfq.created_at).toLocaleDateString()} • {rfq.type.replace('_', ' ')}
                                        </div>
                                    </div>

                                    {isQuoted ? (
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Quoted</Badge>
                                    ) : (
                                        <Button size="sm" variant="outline" asChild className="h-8 text-xs">
                                            <Link href="/vendor/leads">Quote</Link>
                                        </Button>
                                    )}
                                </div>
                            )
                        })}
                        {rfqs.length === 0 && (
                            <div className="p-8 text-center text-slate-500">No recent enquiries found.</div>
                        )}
                    </div>
                </div>

                {/* Quick Actions / System Status */}
                <div className="space-y-6">
                    <h2 className="text-xl font-display font-bold text-slate-900">Quick Actions</h2>
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                        <Button variant="outline" className="w-full justify-start h-12 text-slate-600 hover:text-orange-600 hover:bg-orange-50 border-slate-200">
                            <Package className="h-5 w-5 mr-3 text-slate-400" />
                            Update Inventory Levels
                        </Button>
                        <Button variant="outline" className="w-full justify-start h-12 text-slate-600 hover:text-orange-600 hover:bg-orange-50 border-slate-200">
                            <MessageSquare className="h-5 w-5 mr-3 text-slate-400" />
                            Review Past Quotes
                        </Button>
                        <Button variant="outline" className="w-full justify-start h-12 text-slate-600 hover:text-orange-600 hover:bg-orange-50 border-slate-200">
                            <TrendingUp className="h-5 w-5 mr-3 text-slate-400" />
                            Download Sales Report
                        </Button>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-2">Pro Tip</h3>
                        <p className="text-sm text-blue-700 leading-relaxed">
                            Responding to RFQs within 2 hours increases conversion rate by 40%. You have <span className="font-bold">{pendingAction} pending enquiries</span> waiting for your quote.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
