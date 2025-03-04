import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormType, loginResolver } from "~/src/domain/schemas/auth.schema";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "~/src/components/layouts/AuthLayout";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { router } from "expo-router";
import axios from "axios";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: loginResolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://172.172.22.220:3000/api/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Đăng nhập thành công!");
        console.log(response.data);
        router.push({
          pathname: "/profile",
          params: {
            email: data.email, 
          },
        });
      } else {
        alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Lỗi khi đăng nhập. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <View className="px-5 flex h-full items-center justify-center">
        <Text className="text-4xl font-bold font-TenorSans-Regular">Login</Text>
        <View className="mt-2 w-full">
          <Label>Email</Label>
          <Input
            name="email"
            control={control}
            error={errors.email}
            placeholder="Nhập email"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <View className="mt-2">
            <Label>Password</Label>
            <Input
              name="password"
              control={control}
              error={errors.password}
              placeholder="Nhập mật khẩu"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className={`bg-black px-2 py-4 rounded-lg w-full mt-4 ${isSubmitting ? "opacity-50" : ""}`}
            disabled={isSubmitting}
          >
            <Text className="text-center text-white font-bold text-xl">
              {isSubmitting ? "Đang gửi..." : "Đăng nhập"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
};

export default SignIn;