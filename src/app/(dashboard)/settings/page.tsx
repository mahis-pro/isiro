import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/profile-form";
import { BusinessForm } from "@/components/business-form";
import { PreferencesForm } from "@/components/preferences-form";
import { ServerProfileDisplay } from "@/components/settings/server-profile-display"; // Import the new component

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold font-poppins">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, business, and preferences.
        </p>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6 space-y-6"> {/* Added space-y-6 for spacing */}
          <ServerProfileDisplay /> {/* Integrate the server component here */}
          <ProfileForm />
        </TabsContent>
        <TabsContent value="business" className="mt-6">
          <BusinessForm />
        </TabsContent>
        <TabsContent value="preferences" className="mt-6">
          <PreferencesForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}