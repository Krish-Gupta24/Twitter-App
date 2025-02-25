import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import TrendingSection from "@/components/TrendingSection";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user/explore");
        setUsers(response.data); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
    
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto ">
        <div className="flex">
          <Navbar />
          <main className="flex-1 ml-64 border-r border-border min-h-screen p-4">
            
            <div className="flex items-center  p-3 rounded-lg shadow-sm mb-4">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <Input
                placeholder="Search User"
                className="w-full bg-transparent focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <Card
                    key={user.id}
                    className="p-4 shadow-sm hover:shadow-md transition duration-200 flex items-center gap-4"
                  >
                    <Avatar className="h-19  w-19   rounded-full">
                      <AvatarImage
                        src={
                          user.profilePic ||
                          `https://api.dicebear.com/9.x/initials/svg?seed=${user.username}`
                        }
                        alt={user.fullName}
                        className="h-full w-full rounded-full object-cover"
                      />
                      <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardContent>
                      <p className="font-semibold text-lg">{user.fullName}</p>
                      <p className="text-sm text-gray-500">{user.username}</p>
                      <p className="text-sm text-gray-500">{user.bio}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-gray-500 mt-4">No users found</p>
              )}
            </div>
          </main>

          <aside className="w-80 p-4">
            <div className="sticky top-2">
              <TrendingSection />
            </div>
          </aside>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SearchUsers;