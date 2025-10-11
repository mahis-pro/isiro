"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share, FileDown } from "lucide-react";
import { BalanceSheetReport } from "@/components/reports/balance-sheet-report";
import { ProfitLossReport } from "@/components/reports/profit-loss-report";
import { CashFlowReport } from "@/components/reports/cash-flow-report";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-poppins">Reports</h1>
          <p className="text-muted-foreground">
            Financial insights at a glance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button>
            <FileDown className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pnl">
        <div className="w-full overflow-x-auto">
          <TabsList className="bg-transparent p-0 border-b rounded-none justify-start h-auto">
            <TabsTrigger
              value="balance-sheet"
              className="whitespace-nowrap rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 border-primary data-[state=active]:bg-transparent px-4"
            >
              Balance Sheet
            </TabsTrigger>
            <TabsTrigger
              value="pnl"
              className="whitespace-nowrap rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 border-primary data-[state=active]:bg-transparent px-4"
            >
              Profit & Loss
            </TabsTrigger>
            <TabsTrigger
              value="cash-flow"
              className="whitespace-nowrap rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 border-primary data-[state=active]:bg-transparent px-4"
            >
              Cashflow
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-6">
          <TabsContent value="pnl">
            <ProfitLossReport />
          </TabsContent>
          <TabsContent value="balance-sheet">
            <BalanceSheetReport />
          </TabsContent>
          <TabsContent value="cash-flow">
            <CashFlowReport />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}