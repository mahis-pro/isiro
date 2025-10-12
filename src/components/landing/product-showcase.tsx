"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

export function ProductShowcase() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-poppins text-3xl font-bold tracking-tight">
            See ÌṢIRÒ in Action
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            Get a glimpse of our clean, intuitive dashboard that makes managing
            your finances a breeze.
          </p>
        </div>
        <div className="mt-16">
          <Card className="shadow-2xl overflow-hidden border-4">
            {/* Browser Header */}
            <div className="bg-muted/50 px-4 py-2 flex items-center gap-2 border-b">
              <span className="h-3 w-3 rounded-full bg-red-500"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
            </div>
            <CardContent className="p-4 sm:p-8 bg-muted/20">
              <div className="space-y-6">
                {/* Mock Summary Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                          Total Sales
                        </p>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Skeleton className="h-8 w-3/4 mt-2" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                          Total Expenses
                        </p>
                        <TrendingDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Skeleton className="h-8 w-3/4 mt-2" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                          Balance
                        </p>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Skeleton className="h-8 w-3/4 mt-2" />
                    </CardContent>
                  </Card>
                </div>
                {/* Mock Chart */}
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-muted-foreground mb-4">
                      Cashflow Snapshot
                    </p>
                    <div className="flex items-end gap-2 h-40">
                      <Skeleton className="h-1/2 w-full" />
                      <Skeleton className="h-1/3 w-full" />
                      <Skeleton className="h-3/4 w-full" />
                      <Skeleton className="h-2/3 w-full" />
                      <Skeleton className="h-1/2 w-full" />
                      <Skeleton className="h-full w-full" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}