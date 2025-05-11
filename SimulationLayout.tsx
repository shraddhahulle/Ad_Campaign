
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

type SimulationLayoutProps = {
  children: ReactNode;
};

const SimulationLayout = ({ children }: SimulationLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </Link>
      </div>
      
      <main className="flex-grow pb-16">
        {children}
      </main>
      
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>Ad Campaign Simulation Tool © {new Date().getFullYear()}</p>
          <p className="text-xs mt-1">
            This is an educational simulation for learning purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SimulationLayout;
