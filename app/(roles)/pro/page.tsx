
'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, Phone, Mail, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProLeadMarket() {
    const { leads, walletBalance, unlockLead } = useAppStore();

    const handleUnlock = (id: string) => {
        const success = unlockLead(id);
        if (success) {
            alert('Lead Unlocked! Contact details revealed.');
        } else {
            alert('Insufficient credits!');
        }
    };

    return (
        <div className="container py-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-display font-bold tracking-tight text-slate-900 mb-2">Lead Market</h1>
                    <p className="text-lg text-slate-500">Discover premium projects and unlock direct client access.</p>
                </div>
                <Card className="bg-amber-50/50 border-amber-100 shadow-sm">
                    <CardContent className="p-4 px-6 flex flex-col items-center min-w-[180px]">
                        <span className="text-xs text-amber-900/60 font-bold uppercase tracking-widest mb-1">Wallet Balance</span>
                        <span className="text-3xl font-bold text-amber-700 font-mono tracking-tighter">{walletBalance} <span className="text-lg">CR</span></span>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {leads.map(lead => {
                    const isUnlocked = lead.status === 'unlocked' || lead.status === 'contacted';

                    return (
                        <Card key={lead.id} className={cn(
                            "group relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 rounded-2xl border-slate-100",
                            isUnlocked ? "bg-white ring-1 ring-green-100" : "bg-white"
                        )}>
                            <div className={cn("absolute top-0 left-0 w-full h-1", isUnlocked ? "bg-green-500" : "bg-slate-200 group-hover:bg-orange-400 transition-colors")} />

                            <CardHeader className="pb-4 pt-6 px-6">
                                <div className="flex justify-between items-start mb-3">
                                    <Badge variant="secondary" className={cn("rounded-full px-3 py-1 font-medium", isUnlocked ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-100 text-slate-600")}>
                                        {isUnlocked ? 'Unlocked' : 'New Lead'}
                                    </Badge>
                                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">#{lead.id}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 leading-snug font-display group-hover:text-orange-700 transition-colors">
                                    {lead.title}
                                </h3>
                                <div className="flex items-center text-sm text-slate-500 mt-2 font-medium">
                                    <MapPin className="h-4 w-4 mr-1.5 text-slate-400" /> {lead.location}
                                </div>
                            </CardHeader>

                            <CardContent className="px-6 pb-6">
                                <p className="text-sm text-slate-600 leading-relaxed mb-6 bg-slate-50/80 p-4 rounded-xl border border-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all">
                                    "{lead.description}"
                                </p>

                                {isUnlocked ? (
                                    <div className="space-y-3 bg-green-50/50 p-4 rounded-xl border border-green-100/50 animate-in fade-in duration-500">
                                        <div className="flex items-center text-sm font-semibold text-slate-800">
                                            <Phone className="h-4 w-4 mr-3 text-green-600" />
                                            {lead.contact_details?.phone}
                                        </div>
                                        <div className="flex items-center text-sm font-semibold text-slate-800">
                                            <Mail className="h-4 w-4 mr-3 text-green-600" />
                                            {lead.contact_details?.email}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between text-sm p-4 rounded-xl border border-slate-100 bg-slate-50/50 group-hover:bg-orange-50/30 group-hover:border-orange-100 transition-colors">
                                        <div className="flex items-center text-slate-500">
                                            <Lock className="h-4 w-4 mr-2.5" />
                                            <span className="font-medium">Contact Hidden</span>
                                        </div>
                                        <span className="font-bold text-slate-900 bg-white px-2 py-1 rounded shadow-sm text-xs border">{lead.cost_in_credits} CR</span>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="px-6 pb-6 pt-0">
                                {isUnlocked ? (
                                    <Button variant="outline" className="w-full h-12 rounded-xl border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 font-semibold">
                                        Mark as Contacted
                                    </Button>
                                ) : (
                                    <Button className="w-full h-12 rounded-xl bg-slate-900 hover:bg-orange-600 text-white shadow-lg shadow-slate-200 hover:shadow-orange-200 transition-all font-medium text-base" onClick={() => handleUnlock(lead.id)}>
                                        <Unlock className="h-4 w-4 mr-2" />
                                        Unlock Details
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
