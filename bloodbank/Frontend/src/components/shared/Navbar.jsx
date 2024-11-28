import React, { useEffect, useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import logo from '../../images/logo1real.png';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    // Check if the user is logged in by checking for a token in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Fetch profile picture URL if available
      const pic = localStorage.getItem("profilePic"); // Assume profilePic is stored in local storage
      setProfilePic(pic || ""); // Use an empty string if no pic is found
    }
  }, []);

  const handleLogout = () => {
    // Remove token and profile picture from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("profilePic");
    setIsLoggedIn(false);
  };

  const handleViewProfile = () => {
    // Redirect to user dashboard
    window.location.href = "/userdashboard";
  };

  return (
    <header className="flex h-20 bg-[#8B0000] w-full shrink-0 items-center px-4 md:px-6 fixed top-0 left-0 right-0 z-50 shadow-md p-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link to="/" className="mr-6 flex lg:hidden">
            <MountainIcon />
            <span className="sr-only">BloodLink</span>
          </Link>
          <div className="grid gap-2 py-6">
            <Link to="/" className="flex w-full items-center py-2 text-lg font-semibold">Home</Link>
            <Link to="/about" className="flex w-full items-center py-2 text-lg font-semibold">About</Link>
            <Link to="/signin" className="flex w-full items-center py-2 text-lg font-semibold">Donate Blood</Link>
            <Link to="/signin" className="flex w-full items-center py-2 text-lg font-semibold">Request Blood</Link>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="flex w-full items-center py-2 text-lg font-semibold">
                Logout
              </button>
            ) : (
              <>
                <Link to="/signup" className="flex w-full items-center py-2 text-lg font-semibold">Sign Up</Link>
                <Link to="/signin" className="flex w-full items-center py-2 text-lg font-semibold">Sign In</Link>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <Link to="/" className="mr-6 hidden lg:flex">
        <MountainIcon />
        <span className="sr-only">BloodLink</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        <Link to="/" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium">Home</Link>
        <Link to="/about" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium">About</Link>
        <Link to="/signin" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium">Donate Blood</Link>
        <Link to="/signin" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium">Request Blood</Link>
        {isLoggedIn ? (
          <div className="relative">
            <button className="flex items-center" onClick={handleViewProfile}>
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="h-8 w-8 rounded-full" />
              ) : (
                <ProfileIcon className="h-8 w-8" />
              )}
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                Logout
              </button>
              <button onClick={handleViewProfile} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                View Profile
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/signup" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium">Sign Up</Link>
            <Link to="/signin" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium">Sign In</Link>
          </>
        )}
      </nav>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon() {
  return (
    <img src={logo} alt="BloodLink" className="ml-12 h-14 w-24" />
  );
}

function ProfileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
    </svg>
  );
}