import { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CustomCursor from "@/components/ui/custom-cursor";
import Preloader from "@/components/ui/preloader";
import CursorTrail from "@/components/ui/cursor-trail";
import { ChatWidget } from "@/components/ui/chatbot";
// import { useSuperSmoothScroll } from "@/hooks/use-super-smooth-scroll";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate preloader timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <CustomCursor />
        <CursorTrail />
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <main id="smooth-content">
              <Router />
            </main>
            <ChatWidget />
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
