import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CipherProvider } from "@/context/CipherContext";
import Home from '@/pages/Home';
import Algorithms from '@/pages/Algorithms';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CipherProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/algorithms" element={<Algorithms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </CipherProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
