
'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { RoleSwitcher } from '@/components/features/role-switcher/RoleSwitcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Bell, ShoppingCart, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navbar() {
    const { activeRole, currentUser, rfqs, walletBalance } = useAppStore();
    const pathname = usePathname();

    const getNavLinks = () => {
        switch (activeRole) {
            case 'buyer':
                return [
                    { href: '/buyer', label: 'Marketplace' },
                    { href: '/buyer/projects', label: 'My Projects' },
                    { href: '/buyer/rfqs', label: 'RFQs' },
                    { href: '/buyer/pros', label: 'Find Pros' },
                ];
            case 'vendor':
                return [
                    { href: '/vendor', label: 'Dashboard' },
                    { href: '/vendor/products', label: 'Inventory' },
                    { href: '/vendor/leads', label: 'Leads & RFQs' },
                ];
            case 'pro':
                return [
                    { href: '/pro', label: 'Lead Market' },
                    { href: '/pro/projects', label: 'My Portfolio' },
                    { href: '/pro/profile', label: 'Profile' },
                ];
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-sm shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center">
                {/* Logo */}
                <div className="mr-8 flex items-center gap-2">
                    <div className="h-9 w-9 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-200">
                        <span className="text-white font-playfair font-bold text-xl">S</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 font-display">Structura</span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    {getNavLinks().map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "transition-all duration-200 hover:text-orange-600 relative py-1",
                                pathname === link.href
                                    ? "text-orange-600 font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-600 after:rounded-full"
                                    : "text-slate-500 hover:text-slate-800"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex-1" />

                {/* Actions */}
                <div className="flex items-center space-x-3">
                    <RoleSwitcher />

                    <div className="hidden md:block h-6 w-px bg-slate-100 mx-2" />

                    {activeRole === 'pro' && (
                        <div className="hidden md:flex flex-col items-end mr-2">
                            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Balance</span>
                            <span className="text-sm font-bold text-slate-900 font-mono tracking-tight">{walletBalance} CR</span>
                        </div>
                    )}

                    <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-colors hidden sm:flex">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                    </Button>

                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm ring-1 ring-slate-100 cursor-pointer transition-transform hover:scale-105 hidden sm:block">
                        <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                        <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden ml-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="-mr-2">
                                    <Menu className="h-6 w-6 text-slate-700" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <div className="flex flex-col gap-8 mt-8">
                                    <div className="flex items-center gap-3 pb-8 border-b border-slate-100">
                                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                            <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                                            <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-bold text-slate-900">{currentUser?.name}</h3>
                                            <p className="text-sm text-slate-500 capitalize">{activeRole} Account</p>
                                        </div>
                                    </div>

                                    <nav className="flex flex-col space-y-4">
                                        {getNavLinks().map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={cn(
                                                    "text-lg font-medium py-2 px-4 rounded-lg transition-colors",
                                                    pathname === link.href
                                                        ? "bg-orange-50 text-orange-700"
                                                        : "text-slate-600 hover:bg-slate-50"
                                                )}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </nav>

                                    {activeRole === 'pro' && (
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-auto">
                                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">Wallet Balance</span>
                                            <span className="text-2xl font-bold text-slate-900 font-mono">{walletBalance} CR</span>
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
