import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";

const UpdateProfileModal = ({ user, closeModal }) => {
  const [fullName, setfullName] = useState(user?.fullName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [username, setUsername] = useState(user?.username || "");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(user?.profilePic || null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("bio", bio);
    formData.append("username", username);

    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      await axiosInstance.patch("/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      alert("Profile updated successfully!");
      closeModal();
      window.location.reload();
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-96">
        <h3 className="text-xl font-bold text-white text-center mb-4">
          Edit Profile
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Picture Preview */}
          <div className="flex justify-center">
            <Avatar className="h-24 w-24 border-2 border-gray-500">
              <AvatarImage src={preview} alt="Profile Preview" />
              <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>

          {/* Name Input */}
          <Label>Full Name</Label>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            placeholder="Enter your name"
            className="bg-gray-800 text-white border border-gray-700"
            required
          />

          {/* Bio Input */}
          <Label>Bio</Label>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
            className="bg-gray-800 text-white border border-gray-700"
            rows={3}
          />

          {/* Username Input */}
          <Label>Username</Label>
          <Textarea
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your Username"
            className="bg-gray-800 text-white border border-gray-700"
          />

          {/* Profile Picture Upload */}
          <Label>Profile Pic</Label>
          <Input
            type="file"
            onChange={handleFileChange}
            className="text-white border border-gray-700"
          />

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <Button type="submit" className="bg-blue-500" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button type="button" variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
