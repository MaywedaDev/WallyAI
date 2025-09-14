import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "lib/appwrite";
import { useGlobalContext } from "context/GlobalProvider";

export default function SignUp() {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!form.email || !form.password || !form.userName) {
      setError("Please fill all fields");
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createUser(form.email, form.password, form.userName);

      if (result) {
        setUser(result);
        setIsLoggedIn(true);
        router.replace("/home");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong, please try again later");
    }

    setIsSubmitting(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[95vh] justify-center px-6 my-6 flex-1">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[240px] h-[240px]"
          />
          <Text className="text-2xl text-white font-psemibold mt-10 text-semibold">
            Sign up to WallyAI
          </Text>
          <FormField
            title="Username"
            value={form.userName}
            handleTextChange={(e) => setForm({ ...form, userName: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Email"
            value={form.email}
            handleTextChange={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleTextChange={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <CustomButton
            title="Sign up"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex-row justify-center gap-2 mt-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              className="text-lg font-psemibold text-secondary"
              href="/sign-in"
            >
              Sign in
            </Link>
          </View>
          {error && (
            <Text className="text-red-500 text-base font-pregular mt-5 text-center">
              {error}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
