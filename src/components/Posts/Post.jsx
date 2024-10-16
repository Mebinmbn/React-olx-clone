import { useContext, useEffect, useState } from "react";
import { FireBaseContext } from "../../Contexts/Context";
import { collection, getDocs } from "firebase/firestore";
import Heart from "../../assets/Heart";
import "./Post.css";
import { useNavigate } from "react-router-dom";
import { postContext } from "../../contexts/PostsContext";
import PropTypes from "prop-types";

const Posts = ({ searchText, selectedCategory, setSelectedCategory }) => {
  const { fireBase } = useContext(FireBaseContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { setPostData } = useContext(postContext);

  useEffect(() => {
    getDocs(collection(fireBase, "items"))
      .then((querySnapshot) => {
        const allItems = querySnapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        setProducts(allItems);
      })
      .catch((error) => {
        console.log("Error fetching documents:", error);
      });
  }, [fireBase]);

  const filteredProducts = products.filter((product) => {
    if (searchText) {
      setSelectedCategory("");
      return product.productName
        .toLowerCase()
        .includes(searchText.toLowerCase());
    }
    if (selectedCategory) {
      return product.category.toLowerCase() === selectedCategory.toLowerCase();
    }
    return products;
  });

  console.log("FilteredProd", filteredProducts);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {filteredProducts.map((item, index) => (
            <div
              className="card"
              onClick={() => {
                setPostData(item);
                localStorage.setItem("postData", JSON.stringify(item));
                console.log("Saved to localStorage: ", item);
                navigate("/viewproduct");
              }}
              key={index}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={item.imgUrl} alt={item.productName} />
              </div>
              <div className="content">
                <span className="kilometer">{item.productName}</span>
                <p className="rate">&#x20B9; {item.price}</p>
                <p className="name">{item.brand}</p>
              </div>
              <div className="date">
                <span>{item.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {filteredProducts.map((item, index) => (
            <div
              className="card"
              onClick={() => {
                setPostData(item);
                navigate("/viewproduct");
              }}
              key={index}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={item.imgUrl} alt={item.productName} />
              </div>
              <div className="content">
                <span className="kilometer">{item.productName}</span>
                <p className="rate">&#x20B9; {item.price}</p>
                <p className="name">{item.brand}</p>
              </div>
              <div className="date">
                <span>{item.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Posts.propTypes = {
  searchText: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default Posts;
