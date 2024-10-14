import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import AddProduct from "./components/Create/Create";
import ViewProduct from "./components/View/View";
import Context, { AuthContext } from "./Contexts/Context";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./fireBase/config";
import PostsProvider from "./contexts/PostsContext";

const App = () => {
  return (
    <Context>
      <PostsProvider>
        <Router>
          <AuthHandler />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/viewproduct" element={<ViewProduct />} />
          </Routes>
        </Router>
      </PostsProvider>
    </Context>
  );
};

const AuthHandler = () => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [setUser]);

  return null;
};

export default App;
