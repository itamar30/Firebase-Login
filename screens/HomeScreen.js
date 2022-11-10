import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("LoginScreen");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <View style={styles.container}>
      <Text style={{ marginVertical: 20 }}>looged as</Text>
      <Text style={{ marginVertical: 20 }}>
        Email: {auth.currentUser?.email}
      </Text>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  signOutButton: {
    height: 60,
    width: 240,
    backgroundColor: "blue",
    marginVertical: 4,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  signOutText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
});
