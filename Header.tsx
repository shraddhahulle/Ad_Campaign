
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

const Header = () => {
  const { user } = useUser();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header className="border-b bg-white shadow-sm z-10">
      <div className="container mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold text-primary">
            AdSim
          </Link>
          <h1 className="text-lg font-medium hidden sm:block">Ad Campaign Simulation</h1>
        </div>
        
        <div>
          {user ? (
            <Link to="/profile" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Avatar className="h-8 w-8">
                {user.avatar ? (
                  <AvatarImage src={user.avatar} alt={user.name} />
                ) : (
                  <AvatarFallback className="bg-primary/20 text-primary text-xs">
                    {getInitials(user.name)}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="text-sm hidden sm:inline-block">{user.name}</span>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
