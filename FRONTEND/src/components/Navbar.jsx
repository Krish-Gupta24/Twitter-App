import React, { useState } from 'react';
import { Home, Search, Mail, User, LogOut, Bell, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import axiosInstance from '@/utils/axiosInstance';
import useUserStore from '@/store/userStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { user,logged } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const logouts = async () => {
    try {
      const response = await axiosInstance.post('/user/logout');
      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { icon: <Home size={24} />, text: 'Home', path: '/home' },
    { icon: <Search size={24} />, text: 'Explore', path: '/search' },
    { icon: <Mail size={24} />, text: 'Messages', path: '/message' },
    { icon: <User size={24} />, text: 'Profile', path: `/user/${user.username}` },
    { icon: <Bell size={24} />, text: 'Notification', path: `/notification` },
  ];

  return (
    <div className="fixed h-screen w-64 border-r border-border p-4  text-white">
      <div className="mb-4 flex justify-center">
        <FontAwesomeIcon icon={faXTwitter} size="2x" />
      </div>
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant={location.pathname === item.path ? 'default' : 'ghost'}
            className="w-full justify-start space-x-4 px-3 transition-all duration-300 hover:bg-gray-800 rounded-lg"
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="text-xl">{item.text}</span>
          </Button>
        ))}
      </nav>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center lg:px-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-12 w-12 items-center justify-center rounded-full lg:w-full lg:justify-start lg:gap-2 lg:px-3 hover:bg-gray-800 transition-all duration-300"
            >
              <Avatar className="h-8 w-8 rounded">
                <AvatarImage src={logged.profilePic} alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium">{logged.fullName}</p>
                <p className="text-xs text-muted-foreground">@{logged.username}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2 text-red-500 focus:text-red-500 cursor-pointer hover:bg-red-100"
              onClick={logouts}
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;