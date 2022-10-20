import { createContext, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface UserType {
  email: string;
  username: string;
  accessToken: string;
}

const UserContext = createContext<[UserType, (user: UserType) => void] | null>(
  null
);

export function UserProvider({ children }: Props) {
  const [user, setValue] = useState({
    email: "",
    username: "",
    accessToken: "",
  });
  const setUser = (user: UserType) => {
    setValue(user);
  };
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserState() {
  const value = useContext(UserContext);

  console.log("Value", value);
  if (value === undefined) {
    throw new Error("useCounterState should be used within CounterProvider");
  }

  return value;
}
