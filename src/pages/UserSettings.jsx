import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const UserSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    const savedNotifications = JSON.parse(localStorage.getItem("notifications"));
    if (savedDarkMode !== null) setDarkMode(savedDarkMode);
    if (savedNotifications !== null) setNotifications(savedNotifications);
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    localStorage.setItem("notifications", JSON.stringify(notifications));
    alert("Settings saved!");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">User Settings</h1>
        <p className="text-lg text-muted-foreground">
          Customize your experience.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="darkMode">Dark Mode</Label>
            <Switch id="darkMode" checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="notifications">Notifications</Label>
            <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <Button variant="primary" onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettings;