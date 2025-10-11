"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(value);
};

const assets = [
  { item: "Cash", amount: 1600000 },
  { item: "Accounts Receivable", amount: 450000 },
  { item: "Inventory", amount: 800000 },
];

const liabilities = [
  { item: "Accounts Payable", amount: 320000 },
  { item: "Loans", amount: 500000 },
];

const totalAssets = assets.reduce((sum, asset) => sum + asset.amount, 0);
const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.amount, 0);
const totalEquity = totalAssets - totalLiabilities;

export function BalanceSheetReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance Sheet</CardTitle>
        <CardDescription>Assets, Liabilities, and Equity overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Assets */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Assets</h3>
            <div className="space-y-2">
              {assets.map((asset) => (
                <div key={asset.item} className="flex justify-between items-center py-1 border-b">
                  <p className="text-muted-foreground">{asset.item}</p>
                  <p>{formatCurrency(asset.amount)}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center font-bold pt-2">
              <p>Total Assets</p>
              <p>{formatCurrency(totalAssets)}</p>
            </div>
          </div>

          {/* Liabilities */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Liabilities</h3>
            <div className="space-y-2">
              {liabilities.map((liability) => (
                <div key={liability.item} className="flex justify-between items-center py-1 border-b">
                  <p className="text-muted-foreground">{liability.item}</p>
                  <p>{formatCurrency(liability.amount)}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center font-bold pt-2">
              <p>Total Liabilities</p>
              <p>{formatCurrency(totalLiabilities)}</p>
            </div>
          </div>
        </div>

        {/* Total Equity */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 p-2 rounded-full">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-primary font-semibold">Total Equity</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(totalEquity)}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Assets - Liabilities</p>
        </div>
      </CardContent>
    </Card>
  );
}