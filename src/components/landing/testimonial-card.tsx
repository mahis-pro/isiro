"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  quote: string;
}

export function TestimonialCard({ name, role, image, quote }: TestimonialCardProps) {
  return (
    <Card className="flex flex-col justify-between shadow-sm">
      <CardHeader>
        <div className="flex items-center">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="text-lg font-medium leading-relaxed">
          “{quote}”
        </blockquote>
      </CardContent>
      <div className="flex items-center gap-4 p-6 pt-0">
        <Avatar>
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </Card>
  );
}