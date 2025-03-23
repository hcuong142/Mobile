import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { router, useLocalSearchParams } from "expo-router";
import {
  ProfileFormType,
  profileResolver,
} from "~/src/domain/schemas/profile.schema";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";
import axios from "axios";

const ProfileScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState<string | null>(null); // Removed hardcoded default image
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For image picking
  const [profileLoading, setProfileLoading] = useState(true); // For profile API loading
  const [error, setError] = useState<string | null>(null); // For error handling

  // Get email and profileData from navigation params
  const { email, profileData } = useLocalSearchParams<{
    email?: string;
    profileData?: string;
  }>();

  // Store original values to compare with current form values, including image
  const [originalValues, setOriginalValues] = useState<{
    email: string;
    phoneNumber: string;
    profileImage: string | null;
  }>({
    email: "",
    phoneNumber: "",
    profileImage: null,
  });

  // Fetch profile data when the component mounts or email changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) {
        setError("No email provided. Please log in again.");
        setProfileLoading(false);
        return;
      }

      setProfileLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://172.172.12.96:3000/api/users/profiles/${email}`,
          {
            headers: {
              "Accept": "application/json",
              // You might need to include an authorization token here if required
              // "Authorization": `Bearer ${yourAuthToken}` // Uncomment and modify if authentication is needed
            }
          }
        );

        if (response.status === 200) {
          const profileData = response.data;
          // Update original values and form with fetched data
          setOriginalValues({
            email: profileData.email || (email as string),
            phoneNumber: profileData.phoneNumber || "",
            profileImage: profileData.profileImage || null,
          });

          // Reset form with fetched data
          reset({
            email: profileData.email || (email as string),
            phoneNumber: profileData.phoneNumber || "",
          });

          // Update image if profileImage is returned
          if (profileData.profileImage) {
            setImage(profileData.profileImage);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response) {
          if (error.response.status === 404) {
            setError("Không tìm thấy người dùng. Vui lòng kiểm tra email.");
          } else {
            setError("Lỗi khi lấy thông tin profile. Vui lòng thử lại sau.");
          }
        } else {
          setError("Lỗi kết nối. Vui lòng thử lại sau.");
        }
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [email]); // Re-run when email changes

  const pickImage = async () => {
    setIsLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPreviewImage(result.assets[0].uri);
        setIsPreviewVisible(true);
      }
    } catch (error) {
      console.log("Error picking image:", error);
      alert("Failed to pick image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmImage = () => {
    if (previewImage) {
      setImage(previewImage);
      setPreviewImage(null);
      setIsPreviewVisible(false);
    }
  };

  const cancelImage = () => {
    setPreviewImage(null);
    setIsPreviewVisible(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    watch,
  } = useForm<ProfileFormType>({
    resolver: profileResolver,
    defaultValues: {
      email: email as string || "",
      phoneNumber: "",
    },
  });

  const currentValues = watch();

  const hasChanges = () => {
    return (
      currentValues.email !== originalValues.email ||
      currentValues.phoneNumber !== originalValues.phoneNumber ||
      (image && image !== originalValues.profileImage)
    );
  };

  const onSubmit: SubmitHandler<ProfileFormType> = async (
    data: ProfileFormType
  ) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      formData.append("firstName", "huy"); 
      formData.append("lastName", "cuong"); 
      formData.append("phoneNumber", data.phoneNumber);

      if (image && image !== originalValues.profileImage) {
        const fileName = image.split("/").pop() || "profile.jpg";
        const fileType = "image/jpeg"; 
        formData.append("profileImage", {
          uri: image,
          name: fileName,
          type: fileType,
        } as any);
      }
      console.log('data', data?.email);
      
      // Send PUT request to update profile
      const response = await axios.put(
        `http://172.172.12.96:3000/api/users/profiles/${data.email}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
          }
        }
      );

      if (response.status === 200) {
        alert("Cập nhật profile thành công!");
        console.log(response.data);

        setOriginalValues({
          email: data.email,
          phoneNumber: data.phoneNumber,
          profileImage: image || originalValues.profileImage,
        });
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(`Cập nhật profile thất bại: ${error.message || "Vui lòng thử lại sau."}`);
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset(originalValues);
    setImage(originalValues.profileImage);
  };

  return (
    <ScrollView>
      <View className="bg-slate-500 h-screen">
        <View className="flex items-center justify-center">
          {profileLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text className="text-red-500 text-center">{error}</Text>
          ) : image ? (
            <Image
              source={{ uri: image }}
              className="h-[200px] w-[200px] rounded-full mt-5"
            />
          ) : (
            <Text className="text-center">No profile image available</Text>
          )}
          <Button
            title="Pick an image from camera roll"
            onPress={pickImage}
            disabled={isLoading || profileLoading}
          />
          {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
        </View>

        <View className="px-5 py-5 mx-5 bg-slate-200 rounded-md mt-10">
          <Label id="inputLabel" className="">
            Email
          </Label>
          <Input
            name="email"
            control={control}
            error={errors.email}
            placeholder="email"
            className=""
            editable={isEditing}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <View className="mt-2">
            <Label id="passwordLabel" className="mt-5">
              Phone number
            </Label>
            <Input
              name="phoneNumber"
              control={control}
              error={errors.phoneNumber}
              placeholder="Phone number"
              editable={isEditing}
              className=""
            />
          </View>

          {isEditing ? (
            <View className="mt-4 flex-row justify-between">
              <TouchableOpacity
                onPress={handleCancel}
                className="bg-red-500 px-2 py-4 rounded-lg w-[48%] disabled:opacity-50"
                disabled={isSubmitting}
              >
                <Text className="text-center text-white font-bold text-xl">
                  Cancel
                </Text>
              </TouchableOpacity>

              {hasChanges() ? (
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  className={`bg-black px-2 py-4 rounded-lg w-[48%] ${
                    isSubmitting ? "opacity-50" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  <Text className="text-center text-white font-bold text-xl">
                    Save
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              className={`bg-black px-2 py-4 rounded-lg w-full mt-4 ${
                isSubmitting ? "opacity-50" : ""
              }`}
              disabled={isSubmitting}
            >
              <Text className="text-center text-white font-bold text-xl">
                Edit Profile
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Modal
          isVisible={isPreviewVisible}
          onBackdropPress={cancelImage}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          style={{ margin: 0 }}
        >
          <View className="bg-white p-4 rounded-lg h-[80%] justify-center items-center">
            {previewImage && (
              <Image
                source={{ uri: previewImage }}
                className="h-[300px] w-[300px] rounded-lg mb-4"
              />
            )}
            <Text className="text-lg font-bold mb-4">Preview Image</Text>
            <View className="flex-row justify-between w-full">
              <TouchableOpacity
                onPress={cancelImage}
                className="bg-red-500 px-4 py-2 rounded-lg w-[48%]"
              >
                <Text className="text-white text-center font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmImage}
                className="bg-green-500 px-4 py-2 rounded-lg w-[48%]"
              >
                <Text className="text-white text-center font-bold">
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;