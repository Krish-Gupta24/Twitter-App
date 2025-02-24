import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import TrendingSection from "@/components/TrendingSection";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";

const users = [
  {
    id: 1,
    profilePic:
      "https://plus.unsplash.com/premium_photo-1738849384078-590f9060a80c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
    fullName: "John Doe",
    username: "@johndoe",
    bio: "Excited about the future of AI! 🤖",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    username: "@janesmith",
    bio: "Frontend development is evolving fast! 🚀",
  },
];

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex">
          <Navbar />
          <main className="flex-1 ml-64 border-r border-border min-h-screen p-4">
            {/* Search Bar */}
            <div className="flex items-center  p-3 rounded-lg shadow-sm mb-4">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <Input
                placeholder="Search User"
                className="w-full bg-transparent focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* User Results */}
            <div className="space-y-4">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <Card
                    key={user.id}
                    className="p-4 shadow-sm hover:shadow-md transition duration-200 flex items-center gap-4"
                  >
                    <Avatar className="h-19  w-19   rounded-full">
                      <AvatarImage
                        src={user.profilePic ||`https://api.dicebear.com/9.x/initials/svg?seed=${user.username}`}
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

          {/* Trending Section */}
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
