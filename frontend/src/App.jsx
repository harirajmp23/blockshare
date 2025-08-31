import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import WalletConnect from "./components/WalletConnect";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  const [userAddress, setUserAddress] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [isCheckingWallet, setIsCheckingWallet] = useState(true);
  const [error, setError] = useState("");

  // Initial wallet check
  useEffect(() => {
    console.log("here");
    const checkIfWalletIsConnected = async () => {
      try {
        if (!window.ethereum) {
          setError("Please install MetaMask!");
          setIsCheckingWallet(false);
          return;
        }

        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
          setWalletConnected(true);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
        setError("Error connecting to wallet");
      } finally {
        setIsCheckingWallet(false);
      }
    };

    checkIfWalletIsConnected();
  }, []);

  // Auth check effect
  useEffect(() => {
    if (walletConnected) {
      checkAuth();
    }
  }, [checkAuth, walletConnected]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError("Please install MetaMask!");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setUserAddress(accounts[0]);
      setWalletConnected(true);
      setError("");

      // Setup wallet event listeners
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
        } else {
          setWalletConnected(false);
          setUserAddress("");
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setError("Error connecting to wallet");
    }
  };

  // Show loading state while checking wallet
  if (isCheckingWallet) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  // Show wallet connection screen if not connected
  if (!walletConnected) {
    return <WalletConnect connectWallet={connectWallet} error={error} />;
  }

  // Show loading state while checking auth
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
