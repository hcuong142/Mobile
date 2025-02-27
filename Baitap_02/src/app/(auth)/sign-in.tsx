import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "~/components/layouts/AuthLayout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

const SignInScreen = () => {
  const loginSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
  });

  type LoginFormType = z.infer<typeof loginSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<LoginFormType> = async (
    data: LoginFormType
  ) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Login success");
      console.log(data);
      reset(); // Clear form after successful submission
    } catch (error) {
      alert("Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView>
      <AuthLayout>
        <View className="flex items-center justify-center h-screen">
          <Text className="text-white font-Poppins-Bold text-2xl mb-4">
            Login screen
          </Text>

          <View className="p-2 rounded-lg w-96">
            <Controller
              name="email"
              control={control}
              render={({
                field: { onBlur, onChange, value },
                fieldState: { error },
              }) => (
                <View>
                  <Text className="text-black font-TenorSans-Regular text-lg mb-4">
                    Email
                  </Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange} // Changed from onChange
                    onBlur={onBlur}
                    className="bg-white px-3 py-2 text-lg rounded-md"
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  {errors.email && (
                    <Text className="text-red-800 mt-2 text-sm">
                      {errors.email.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View className="p-2 rounded-lg w-96">
            <Controller
              name="password"
              control={control}
              render={({
                field: { onBlur, onChange, value },
                fieldState: { error },
              }) => (
                <View>
                  <Text className="text-black font-TenorSans-Regular text-lg mb-4">
                    Password
                  </Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange} // Changed from onChange
                    onBlur={onBlur}
                    className="bg-white px-3 py-2 text-lg rounded-md"
                    secureTextEntry
                  />
                  {errors.password && (
                    <Text className="text-red-800 mt-2 text-sm">
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className={`bg-primary p-2 rounded-lg w-96 mt-4 ${
              isSubmitting ? "opacity-50" : ""
            }`}
            disabled={isSubmitting}
          >
            <Text className="text-center text-white font-bold">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </AuthLayout>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
