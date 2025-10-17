import { createClient } from "@/integrations/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export async function ServerProfileDisplay() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let profile = null;
  if (session) {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, business_name, currency, business_type") // Select relevant profile fields
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error("Error fetching server profile:", error);
    } else {
      profile = data;
    }
  }

  if (!session || !profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Server-Side Profile Data</CardTitle>
          <CardDescription>
            This section demonstrates fetching user data directly from the server.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No profile data available from server.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server-Side Profile Data</CardTitle>
        <CardDescription>
          This section demonstrates fetching user data directly from the server.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Full Name (Server)</Label>
          <Input value={profile.full_name || "N/A"} readOnly className="mt-1" />
        </div>
        <div>
          <Label>Email (Server)</Label>
          <Input value={session.user.email || "N/A"} readOnly className="mt-1" />
        </div>
        <div>
          <Label>Business Type (Server)</Label>
          <Input value={profile.business_type || "N/A"} readOnly className="mt-1" />
        </div>
        <div>
          <Label>Currency (Server)</Label>
          <Input value={profile.currency || "N/A"} readOnly className="mt-1" />
        </div>
      </CardContent>
    </Card>
  );
}