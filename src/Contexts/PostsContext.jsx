import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const postContext = createContext(null);

// eslint-disable-next-line react/prop-types
export default function Posts({ children }) {
  const [postData, setPostData] = useState([]);

  return (
    <postContext.Provider value={{ postData, setPostData }}>
      {children}
    </postContext.Provider>
  );
}
