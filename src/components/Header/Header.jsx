import { useContext } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/Context";
import { auth } from "../../fireBase/config";
import { signOut } from "firebase/auth";
import PropTypes from "prop-types";

const Header = ({ setSearchText }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Sign out error: ", error);
      });
  };

  const addProduct = () => {
    if (user) {
      handleLoginClick("/addproduct");
    } else {
      alert("Please login");
      handleLoginClick("/login");
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={() => handleLoginClick("/")} className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span>ENGLISH</span>
          <Arrow />
        </div>
        <div
          className="loginPage"
          onClick={() => handleLoginClick("/login")}
          style={{ cursor: "pointer" }}
        >
          <span>{user ? `Welcome ${user.displayName}` : "Login"}</span>
          <hr />
        </div>
        <div>
          {user && (
            <span style={{ cursor: "pointer" }} onClick={handleLogout}>
              Logout
            </span>
          )}
        </div>
        <div className="sellMenu">
          <SellButton />
          <div onClick={addProduct} className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  setSearchText: PropTypes.func.isRequired,
};

export default Header;
