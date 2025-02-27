import React from "react";
import Navbar from "@/components/Navbar";
import TrendingSection from "@/components/TrendingSection";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Heart, Settings, User2 } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Notification = () => {
  const queryClient = useQueryClient();
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/notifications/"); 
        return res.data; 
      } catch (error) {
        throw new Error(
          error.response?.data?.error || "Failed to fetch notifications"
        );
      }
    },
  });


  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const res = await axiosInstance.delete("/notifications");
        return res.data; 
      } catch (error) {
        throw new Error(error.response?.data?.error || "Something went wrong");
      }
    },
    onSuccess: () => {
      toast.success("Notifications deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });


  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <Navbar />
          <main className="flex-1 ml-64 border-r border-border min-h-screen">
            <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <p className="font-bold">Notifications</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={deleteNotifications}>
                      Delete all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {isLoading && (
                <div className="flex justify-center h-full items-center">
                  <LoadingSpinner size="lg" />
                </div>
              )}
              {notifications?.length === 0 && (
                <div className="text-center p-4 font-bold">
                  No notifications 🤔
                </div>
              )}
              {notifications?.map((notification) => (
                <div
                  className="border-b border-gray-700"
                  key={notification._id}
                >
                  <div className="flex gap-2 p-4">
                    {notification.type === "follow" && (
                      <User2 className="w-7 h-7 text-primary" />
                    )}
                    {notification.type === "like" && (
                      <Heart className="w-7 h-7 text-red-500" />
                    )}
                    <Link
                      to={`/profile/${notification.from.username}`}
                      className="flex items-center gap-2"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                          src={
                            notification.from.profileImg ||
                            "/avatar-placeholder.png"
                          }
                          alt="profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex gap-1">
                        <span className="font-bold">
                          @{notification.from.username}
                        </span>{" "}
                        {notification.type === "follow"
                          ? "followed you"
                          : "liked your post"}
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
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

export default Notification;
