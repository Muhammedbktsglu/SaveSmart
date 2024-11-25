"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const userProfiles = {
  admin: {
    username: "admin",
    profilePicture: "/avatars/admin-avatar.png",
  },
  moderator: {
    username: "moderator",
    profilePicture: "/avatars/moderator-avatar.png",
  },
  user: {
    username: "user",
    profilePicture: "/avatars/user-avatar.png",
  },
};

interface UserContextProps {
  currentUser: typeof userProfiles[keyof typeof userProfiles];
  switchUser: (role: keyof typeof userProfiles) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(userProfiles.moderator); // Varsayılan kullanıcı

  const switchUser = (role: keyof typeof userProfiles) => {
    setCurrentUser(userProfiles[role]);
  };

  return (
    <UserContext.Provider value={{ currentUser, switchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
