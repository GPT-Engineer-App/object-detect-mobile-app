import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, List, Settings as SettingsIcon } from "lucide-react"; // Import Settings icon
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar"; // available: default, navbar, sidebar
import Index from "./pages/Index.jsx";
import ReviewResults from "./pages/ReviewResults.jsx"; // Import ReviewResults page
import Login from "./pages/Login.jsx";
import Settings from "./pages/Settings.jsx"; // Import Settings page

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Dashboard", // Feel free to change this to your liking
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Review Results", // New navigation item
    to: "/review-results",
    icon: <List className="h-4 w-4" />,
  },
  {
    title: "Settings", // New navigation item
    to: "/settings",
    icon: <SettingsIcon className="h-4 w-4" />,
  },
];

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="review-results" element={<ReviewResults />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;