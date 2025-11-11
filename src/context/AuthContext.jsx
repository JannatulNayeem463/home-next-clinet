import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  //Sign up 
  const signup = async (email, password, displayName, photoURL) => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName, photoURL });
      setUser({ ...res.user });
    } catch (error) {
      console.error("Signup Error:", error.code, error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login 
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      return res.user;
    } catch (error) {
      console.error("Login Error:", error.code, error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout 
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error.code, error.message);
    }
  };

  const value = { user, loading, signup, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;