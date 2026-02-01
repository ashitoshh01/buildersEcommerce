
'use client';

import { UserProfile } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, BadgeCheck } from 'lucide-react';

interface ProCardProps {
    pro: UserProfile;
}

export function ProCard({ pro }: ProCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-12 w-12 border">
                    <AvatarImage src={pro.avatar} />
                    <AvatarFallback>{pro.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{pro.name}</h3>
                        {pro.verification_status === 'verified' && (
                            <BadgeCheck className="h-4 w-4 text-blue-500" />
                        )}
                    </div>
                    <p className="text-sm text-slate-500 font-medium">{pro.company_name}</p>
                </div>
                <div className="text-right">
                    <div className="flex items-center text-yellow-500 text-sm font-bold">
                        <Star className="h-4 w-4 mr-1 fill-yellow-500" />
                        4.9
                    </div>
                    <p className="text-xs text-slate-400">12 reviews</p>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="flex items-center text-sm text-slate-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" /> {pro.location}
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">
                    {pro.bio || "Experienced professional ready to handle your construction projects with quality and precision."}
                </p>

                <div className="flex gap-2 mt-4">
                    <Badge variant="secondary">Architecture</Badge>
                    <Badge variant="secondary">Interior</Badge>
                </div>
            </CardContent>
            <CardFooter className="pt-4">
                <Button className="w-full bg-slate-900">View Profile</Button>
            </CardFooter>
        </Card>
    );
}
