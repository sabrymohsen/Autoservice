import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, LogOut } from "lucide-react";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  notifications?: number;
  isAdmin?: boolean;
}

const Header = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
  notifications = 3,
  isAdmin = false,
}: HeaderProps) => {
  return (
    <header className="w-full h-16 bg-black border-b border-gray-800 px-4 flex items-center justify-between fixed top-0 z-50 bg-[#NaNNaNNaN] bg-[#NaNNaNNaN]">
      <div className="flex items-center space-x-8">
        {/* Mercedes Logo */}
        <img
          src="https://www.mercedes-benz.com/etc/designs/brandhub/frontend/static-assets/header/mercedes-benz-logo-white.svg"
          alt="Mercedes Logo"
          className="h-8"
        />

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white hover:text-gray-300">
                Dashboard
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                    Service Overview
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                    Appointments
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                    Service Bays
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white hover:text-gray-300">
                Inventory
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                    Parts Catalog
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                    Stock Levels
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                    Orders
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white hover:text-gray-300">
                Reports
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                    Service History
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                    Analytics
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {isAdmin && (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white hover:text-gray-300">
                  Admin
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                      User Management
                    </NavigationMenuLink>
                    <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                      Service Bay Settings
                    </NavigationMenuLink>
                    <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                      System Configuration
                    </NavigationMenuLink>
                    <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                      Audit Logs
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-white hover:text-gray-300"
        >
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
              {notifications}
            </span>
          )}
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-white hover:text-gray-300"
            >
              <Avatar>
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{userName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
