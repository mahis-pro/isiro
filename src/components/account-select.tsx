"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Account } from "@/contexts/accounts-context";

interface AccountSelectProps {
  accounts: Account[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled: boolean;
}

export function AccountSelect({
  accounts,
  value,
  onChange,
  placeholder,
  disabled,
}: AccountSelectProps) {
  return (
    <Select onValueChange={onChange} value={value} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account) => (
          <SelectItem key={account.id} value={account.account_name}>
            {account.account_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}