
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder, Plus, MoreVertical } from 'lucide-react';

export default function BuyerProjectsPage() {
    const projects = [
        { id: 1, name: '2BHK Renovation - Pune', updated: '2 days ago', items: 12 },
        { id: 2, name: 'Office Interior', updated: '1 week ago', items: 5 },
    ];

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold tracking-tight">My Projects</h1>
                <Button>
                    <Plus className="h-4 w-4 mr-2" /> New Project
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map(project => (
                    <Card key={project.id} className="hover:border-orange-200 transition-colors cursor-pointer group">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <Folder className="h-10 w-10 text-orange-100 fill-orange-100 group-hover:text-orange-200 group-hover:fill-orange-200 transition-colors" />
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-lg mb-1">{project.name}</CardTitle>
                            <p className="text-sm text-slate-500">{project.items} saved items • Updated {project.updated}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
