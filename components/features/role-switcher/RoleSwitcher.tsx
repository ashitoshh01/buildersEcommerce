
'use client';

import { useAppStore } from '@/lib/store';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, HardHat, Store, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Role } from '@/lib/types';

export function RoleSwitcher() {
    const { activeRole, loginAs, currentUser } = useAppStore();
    const router = useRouter();

    const handleSwitch = (role: Role) => {
        loginAs(role);
        router.push(`/${role}`);
    };

    const getRoleIcon = (role: Role) => {
        switch (role) {
            case 'buyer': return <HardHat className="h-4 w-4 mr-2" />;
            case 'vendor': return <Store className="h-4 w-4 mr-2" />;
            case 'pro': return <Briefcase className="h-4 w-4 mr-2" />;
        }
    };

    const getRoleLabel = (role: Role) => {
        switch (role) {
            case 'buyer': return 'Project Manager (Buyer)';
            case 'vendor': return 'Supplier (Vendor)';
            case 'pro': return 'Professional';
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[200px] justify-between bg-slate-50 border-slate-200 text-slate-700">
                    <div className="flex items-center">
                        {getRoleIcon(activeRole)}
                        <span className="truncate">{getRoleLabel(activeRole)}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
                <DropdownMenuLabel>Switch Persona</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSwitch('buyer')}>
                    <HardHat className="h-4 w-4 mr-2" />
                    <span>Buyer View</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSwitch('vendor')}>
                    <Store className="h-4 w-4 mr-2" />
                    <span>Vendor Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSwitch('pro')}>
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>Pro Workspace</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
