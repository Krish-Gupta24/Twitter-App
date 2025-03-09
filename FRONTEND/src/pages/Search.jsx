import React, { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import TrendingSection from "@/components/TrendingSection";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import useUserStore from "@/store/userStore";

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { Gettweet, getTweet } = useUserStore();
  const { postId } = useParams();

  // Get current user data from storage
  const storedUser = localStorage.getItem("user-storage");
  const parsedUser = JSON.parse(storedUser);
  const currentUser = parsedUser?.state?.user;

  // Fetch users and their follow status
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

  // Function to check if a user is followed by the current user
  const isFollowed = useCallback(
    (user) => {
      if (!currentUser) return false;
      return user.followers.includes(currentUser._id);
    },
    [currentUser]
  );

  // Handle follow/unfollow action
  const toFollow = useCallback(
    async (userId, e) => {
      if (e) e.stopPropagation();

      try {
        await axiosInstance.patch(`/user/follow/${userId}`);

        // Update the users array to reflect the follow/unfollow change
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user._id === userId) {
              // Create a copy of the user object
              const updatedUser = { ...user };

              // Toggle follow status
              if (isFollowed(user)) {
                // Remove current user from followers
                updatedUser.followers = user.followers.filter(
                  (id) => id !== currentUser._id
                );
              } else {
                // Add current user to followers
                updatedUser.followers = [...user.followers, currentUser._id];
              }

              return updatedUser;
            }
            return user;
          })
        );
      } catch (error) {
        console.error("Error following/unfollowing user:", error);
      }
    },
    [currentUser, isFollowed]
  );

  // Navigate to user profile
  const navigateToProfile = useCallback(
    (username) => {
      navigate(`/user/${username}`);
    },
    [navigate]
  );

  // Filter users based on search term and sort by follower count
  const filteredUsers = users
    .filter(
      (user) =>
        user._id !== currentUser?._id &&
        (user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => b.followers.length - a.followers.length);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <Navbar />
          <main className="flex-1 ml-64 border-r border-border min-h-screen p-4">
            {/* Search Bar */}
            <div className="flex items-center p-3 rounded-lg shadow-sm mb-4">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <Input
                placeholder="Search User"
                className="w-full bg-transparent focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* User List */}
            <div className="space-y-4">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <Card
                    key={user._id}
                    className="p-4 shadow-sm hover:bg-gray-800 transition duration-200 flex items-center gap-4 cursor-pointer"
                    onClick={() => navigateToProfile(user.username)}
                  >
                    <div className="flex items-center gap-4 w-full">
                      {/* Avatar and User Info */}
                      <Avatar className="h-19 w-19 rounded-full">
                        <AvatarImage
                          src={
                            user.profilePic ||
                            `https://api.dicebear.com/9.x/initials/svg?seed=${user.username}`
                          }
                          alt={user.fullName}
                          className="h-full w-full rounded-full object-cover"
                        />
                        <AvatarFallback>
                          {user.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <CardContent>
                        <p className="font-semibold text-lg">{user.fullName}</p>
                        <p className="text-sm text-gray-500">{user.username}</p>
                        <p className="text-sm text-gray-500">{user.bio}</p>
                      </CardContent>

                      {/* Follow Button on the Right */}
                      <Button
                        data-userid={user._id}
                        onClick={(e) => toFollow(user._id, e)}
                        className={`ml-auto px-4 py-2 rounded-md transition ${
                          isFollowed(user)
                            ? "bg-gray-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {isFollowed(user) ? "Unfollow" : "Follow"}
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-center text-gray-500 mt-4">No users found</p>
              )}
            </div>
          </main>

          {/* Right Sidebar */}
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
