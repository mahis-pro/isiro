"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ThemeSwitcher } from "./theme-switcher";

export function PreferencesForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Manage your theme and notification settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="theme">Theme</Label>
            <p className="text-sm text-muted-foreground">Select your preferred color scheme.</p>
          </div>
          <ThemeSwitcher />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="weekly-summary">Weekly Summary</Label>
            <p className="text-sm text-muted-foreground">Receive a summary of your finances every week.</p>
          </div>
          <Switch id="weekly-summary" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="large-transaction">Large Transactions</Label>
            <p className="text-sm text-muted-foreground">Get notified for transactions over ₦100,000.</p>
          </div>
          <Switch id="large-transaction" />
        </div>
      </CardContent>
    </Card>
  );
}