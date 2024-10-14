import { createContext, useState, useEffect } from "react";
import { auth, fireBase, storage } from "../fireBase/config";
import { onAuthStateChanged, getAuth } from "firebase/auth";

export const FireBaseContext = createContext(null);
export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const Context = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FireBaseContext.Provider value={{ fireBase, auth, storage }}>
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </FireBaseContext.Provider>
  );
};

export default Context;
