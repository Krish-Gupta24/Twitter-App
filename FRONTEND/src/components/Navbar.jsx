import React from 'react';
import { Home, Search, Mail, User,LogOut,BellIcon} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import axiosInstance from '@/utils/axiosInstance';
import useUserStore from '@/store/userStore';


const Navbar = () => {
  const { user } = useUserStore()
    const navigate = useNavigate();
    const location = useLocation();
    
    const logouts = async () => {
        try {
            const response = await axiosInstance.post('/user/logout')
            console.log(response)
            if (response.status===200 ) {
                localStorage.removeItem("token")
                navigate('/login')
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
    const menuItems = [
        { icon: <Home size={24} />, text: 'Home', path: '/home' },
        { icon: <Search size={24} />, text: 'Explore', path: '/search' },
        { icon: <Mail size={24} />, text: 'Messages', path: '/message' },
        { icon: <User size={24} />, text: 'Profile', path: `/user/${user.username}` },
        { icon: <BellIcon size={24} />, text: 'Notification', path: `/notification` },
    ];

    return (
      <div className="fixed h-screen w-64 border-r border-border p-4">
        <div className="mb-4">
          <FontAwesomeIcon icon={faXTwitter} size='2x' />
        </div>
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={location.pathname === item.path ? "default" : "ghost"}
              className={`w-full justify-start space-x-4 px-3 ${
                location.pathname === item.path
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="text-xl">{item.text}</span>
            </Button>
          ))}

          <Button
            className="w-full justify-start space-x-4 px-3"
            variant="ghost"
            onClick={(e) => {
              logouts();
            }}
          >
            <LogOut size={24} />
            <span className="text-xl">Logout</span>
          </Button>
        </nav>
      </div>
    );
}

export default Navbar;
