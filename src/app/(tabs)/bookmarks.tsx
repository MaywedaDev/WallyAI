import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Bookmarks() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6 ">
        <Text className="text-2xl text-white font-psemibold">Bookmarks</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
