import React from 'react';
import { Home, Search, Mail, User, Twitter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const menuItems = [
        { icon: <Home size={24} />, text: 'Home', path: '/home' },
        { icon: <Search size={24} />, text: 'Explore', path: '/search' },
        { icon: <Mail size={24} />, text: 'Messages', path: '/message' },
        { icon: <User size={24} />, text: 'Profile', path: '/user' },
    ];

    return (
        <div className="fixed h-screen w-64 border-r border-border p-4">
            <div className="mb-4">
                <Twitter className="h-8 w-8 text-primary" />
            </div>
            <nav className="space-y-1">
                {menuItems.map((item, index) => (
                    <Button
                        key={index}
                        variant={location.pathname === item.path ? "default" : "ghost"}
                        className={`w-full justify-start space-x-4 px-3 ${location.pathname === item.path }`}
                        onClick={() => navigate(item.path)}
                    >
                        {item.icon}
                        <span className="text-xl">{item.text}</span>
                    </Button>
                ))}
            </nav>
            <Button className="w-full mt-4" size="lg">
                Tweet
            </Button>
        </div>
    );
}

export default Navbar;
