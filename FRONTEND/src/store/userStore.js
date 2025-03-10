import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

const useUserStore = create(
  persist(
    (set, get) => ({
      logged: null,
      user: null,
      selectedTweet: null,
      tweets: [],

      fetchUserProfile: async (username) => {
        try {
          console.log("HEMLOOO");
          const response = await axiosInstance.get(`/user/${username}`);
          console.log("API Response:", response.data.user);
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
                profilePic: profilePic,
                followers: followers?.length || 0,
                followings: followings?.length || 0,
                tweets: tweets || [],
                replies: replies || [],
                likes: likes || [],
              },
            });
          }
        } catch (error) {
          console.error("Error fetching user profile", error);
        }
      },

      tweet: async (content, image = "") => {
        try {
          const response = await axiosInstance.post("/post/addpost", {
            content,
            image,
          });

          if (response.status === 200) {
            const newTweet = response.data.post;

            // Update user's tweets
            set((state) => ({
              user: {
                ...state.user,
                tweets: [newTweet, ...(state.user?.tweets || [])],
              },
            }));
          }
        } catch (error) {
          console.error("Error posting tweet", error);
        }
      },

      Loggedinuser: async () => {
        try {
          const response = await axiosInstance.get(`/user/profile`);
          console.log("API Response:", response.data.user);
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
              logged: {
                _id,
                fullName,
                email,
                username,
                bio,
                profilePic:
                  profilePic ||
                  `https://api.dicebear.com/9.x/initials/svg?seed=${username}`,
                followers: followers?.length || 0,
                followings: followings?.length || 0,
                tweets: tweets || [],
                replies: replies || [],
                likes: likes || [],
              },
            });
          }
        } catch (error) {
          console.error("Error fetching user profile", error);
        }
      },

      getTweet: async (postId) => {
        try {
          const response = await axiosInstance.get(`/post/post/${postId}`);

          if (response.status === 200) {
            console.log("API Response:", response.data);

            set({
              selectedTweet: response.data, // ✅ Correct key
            });
          }
        } catch (error) {
          console.error("Error fetching Post", error);
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
