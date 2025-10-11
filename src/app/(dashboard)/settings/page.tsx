import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold font-poppins">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and business settings.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            This page is under construction. Check back later for more settings!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>We're working hard to bring you a comprehensive settings page.</p>
        </CardContent>
      </Card>
    </div>
  );
}