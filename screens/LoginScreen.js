import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsunscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("HomeScreen");
      }
    });
    return unsunscribe;
  }, [errorMessage]);

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email);
        console.log("user was registered", user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode.toString().replace("auth/", ""));
        setIsError(true);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email);
        console.log("user was Logged in", user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode.toString().replace("auth/", ""));
        setIsError(true);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="email"
        onChangeText={(text) => setemail(text)}
        value={email}
      />
      <TextInput
        style={styles.textInput}
        placeholder="password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      {isError && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.Loginbutton} onPress={handleLogin}>
          <Text style={styles.LoginbuttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerbuttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textInput: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 4,
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 18,
  },
  Loginbutton: {
    height: 60,
    width: 240,
    backgroundColor: "blue",
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  LoginbuttonText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  registerButton: {
    height: 60,
    width: 240,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 15,
  },
  registerbuttonText: {
    fontSize: 22,
    color: "blue",
    fontWeight: "bold",
  },
  buttonsContainer: {
    marginVertical: 20,
  },
  errorMessage: {
    fontSize: 15,
    color: "red",
  },
});
