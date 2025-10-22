"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Account } from "@/contexts/accounts-context";
import { AccountFormDialog } from "./settings/account-form-dialog";
import { useAccounts } from "@/contexts/accounts-context";

interface CategorySelectWithAddProps {
  categories: Account[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: 'income' | 'expense';
  disabled: boolean;
}

export function CategorySelectWithAdd({
  categories,
  value,
  onChange,
  placeholder,
  type,
  disabled,
}: CategorySelectWithAddProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { refreshAccounts } = useAccounts();

  const handleSuccess = () => {
    // Refresh accounts in context
    refreshAccounts();
    setIsDialogOpen(false);
    // Note: We don't automatically set the new category as selected here,
    // as the form field will need to re-render with the updated list.
    // The user will need to select it manually after the list updates.
  };

  return (
    <>
      <div className="flex gap-2">
        <Select onValueChange={onChange} value={value} disabled={disabled}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.account_name}>
                {cat.account_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setIsDialogOpen(true)}
          title={`Add New ${type} Category`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <AccountFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialAccount={null}
        accountType={type}
        onSuccess={handleSuccess}
      />
    </>
  );
}