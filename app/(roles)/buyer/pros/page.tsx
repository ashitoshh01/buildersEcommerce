
'use client';

import { MOCK_USERS } from '@/lib/mock-db';
import { ProCard } from '@/components/features/pros/ProCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function ProsDirectoryPage() {
    const pros = MOCK_USERS.filter(u => u.role === 'pro');

    return (
        <div className="container py-8">
            <div className="max-w-xl mx-auto text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Find Trusted Professionals</h1>
                <p className="text-slate-500">Architects, contractors, and designers verified by AI.</p>

                <div className="relative mt-6 max-w-lg mx-auto">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input placeholder="Search by name, service, or location..." className="pl-9" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pros.map(pro => (
                    <ProCard key={pro.id} pro={pro} />
                ))}
                {/* Replicating mock data to fill the grid for prototype feel */}
                {pros.map(pro => (
                    <ProCard key={`${pro.id}-dup`} pro={{ ...pro, id: `${pro.id}-dup`, name: 'Ar. Sameer Khan', location: 'Mumbai, MH' }} />
                ))}
                {pros.map(pro => (
                    <ProCard key={`${pro.id}-dup2`} pro={{ ...pro, id: `${pro.id}-dup2`, name: 'Studio Green', location: 'Delhi, NCR' }} />
                ))}
            </div>
        </div>
    );
}
