import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold font-poppins">Financial Reports</h1>
        <div className="w-[180px]">
          <Select defaultValue="this-year">
            <SelectTrigger>
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="pnl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pnl">Profit & Loss</TabsTrigger>
          <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="pnl">
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss Statement</CardTitle>
              <CardDescription>For This Year</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Revenue</h3>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Total Sales</p>
                  <p>₦5,900.00</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold">Expenses</h3>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Office Supplies</p>
                  <p>₦45.50</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Software Subscription</p>
                  <p>₦29.99</p>
                </div>
                 <div className="flex justify-between font-medium">
                  <p>Total Expenses</p>
                  <p>₦75.49</p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <p>Net Profit</p>
                <p className="text-primary">₦5,824.51</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balance-sheet">
          <Card>
            <CardHeader>
              <CardTitle>Balance Sheet</CardTitle>
              <CardDescription>As of Today</CardDescription>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground py-12">
              <p>Balance Sheet report coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cash-flow">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Statement</CardTitle>
              <CardDescription>For This Year</CardDescription>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground py-12">
              <p>Cash Flow report coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}