import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "@/utils/axiosInstance";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      tweets: null,
      fetchUserProfile: async () => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance.get("/user/profile");
          if (response.status === 200) {
            const {
              _id,
              fullName,
              email,
              username,
              bio,
              profilePic,
              followers,
              followings,
              tweets,
              replies,
              likes,
            } = response.data.user;

            set({
              user: {
                _id,
                fullName,
                email,
                username,
                bio,
                profilePic:
                  profilePic ||
                  `https://api.dicebear.com/9.x/initials/svg?seed=${username}`,
                followers: followers.length,
                default: 0,
                followings: followings.length,
                default: 0,
                tweets: tweets || [],
                replies: replies || [],
                likes: likes || [],
              },
            });
          }
        } catch (error) {
          console.error("Error fetching user profile", error);
        } finally {
          set({ isLoading: false });
        }
      },

      tweet: async (content, image = "") => {
        try {
          const response = await axiosInstance.post("/post/addpost", {
            content,
            image,
          });

          if (response.status === 200) {
            const newTweet = response.data.post; // Ensure API returns `post`

            set((state) => ({
              tweets: [newTweet, ...(state.tweets || [])], // Append new tweet to existing ones
            }));
          }
        } catch (error) {
          console.error("Error posting tweet", error);
        }
      },
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
