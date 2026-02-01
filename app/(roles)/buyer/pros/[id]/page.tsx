
'use client';

import { MOCK_USERS } from '@/lib/mock-db';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, BadgeCheck, Phone, Mail } from 'lucide-react';
import Image from 'next/image';

export default function ProProfilePage({ params }: { params: { id: string } }) {
    // In a real app we would use params.id. 
    // For prototype, we'll just show a featured pro if ID doesn't match, or the specific one.
    const pro = MOCK_USERS.find(u => u.role === 'pro') || MOCK_USERS[2];

    const portfolio = [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=800'
    ];

    return (
        <div className="container py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                <Avatar className="h-32 w-32 border-4 border-white shadow-sm">
                    <AvatarImage src={pro.avatar} />
                    <AvatarFallback>Pro</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl font-bold">{pro.name}</h1>
                        <BadgeCheck className="h-6 w-6 text-blue-500" />
                    </div>
                    <p className="text-lg text-slate-600 mb-2">{pro.company_name}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {pro.location}</span>
                        <span className="flex items-center text-yellow-600 font-semibold"><Star className="h-4 w-4 mr-1 fill-yellow-500" /> 4.9 (12 verified reviews)</span>
                    </div>
                    <p className="mt-4 max-w-2xl text-slate-600">{pro.bio}</p>
                </div>

                <div className="flex flex-col gap-2 min-w-[200px]">
                    <Button className="w-full bg-slate-900">Request Consultation</Button>
                    <Button variant="outline" className="w-full">
                        <Phone className="h-4 w-4 mr-2" /> Call Now
                    </Button>
                </div>
            </div>

            {/* Portfolio */}
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.map((img, i) => (
                    <div key={i} className="group relative aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden">
                        <Image src={img} alt="Project" fill className="object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <p className="text-white font-medium">Modern Villa Renovation {i + 1}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
