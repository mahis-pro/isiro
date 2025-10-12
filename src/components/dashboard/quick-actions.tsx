import { Button } from "@/components/ui/button";
import { Plus, Minus, Banknote } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Button
        asChild
        size="lg"
        className="h-20 flex-col gap-1 bg-primary/90 hover:bg-primary"
      >
        <Link href="/transactions/new?tab=income">
          <Plus className="h-6 w-6" />
          <span>Add Sale</span>
        </Link>
      </Button>
      <Button asChild size="lg" variant="destructive" className="h-20 flex-col gap-1">
        <Link href="/transactions/new?tab=expense">
          <Minus className="h-6 w-6" />
          <span>Add Expense</span>
        </Link>
      </Button>
      <Button asChild size="lg" variant="secondary" className="h-20 flex-col gap-1">
        <Link href="/transactions/new?tab=loan">
          <Banknote className="h-6 w-6" />
          <span>Add Loan</span>
        </Link>
      </Button>
    </div>
  );
}