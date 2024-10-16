import { useContext, useEffect, useState } from "react";
import "./View.css";
import { postContext } from "../../contexts/PostsContext";
import { FireBaseContext } from "../../Contexts/Context";
import { collection, getDocs, query, where } from "firebase/firestore";
import Header from "../Header/Header";

function View() {
  const { postData, setPostData } = useContext(postContext);
  const { fireBase } = useContext(FireBaseContext);
  const [userDetails, setUserDetails] = useState(null);
  const { userId } = postData;

  useEffect(() => {
    if (!postData) {
      const storedPostData = JSON.parse(localStorage.getItem("postData"));
      if (storedPostData) {
        setPostData(storedPostData);
      } else {
        console.error("No post data found");
        return;
      }
    }
  }, [postData, setPostData]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userQuery = query(
          collection(fireBase, "userCredentials"),
          where("id", "==", userId)
        );
        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId, fireBase]);

  return (
    <>
      <Header />
      <div className="viewParentDiv">
        <div className="imageShowDiv">
          <img src={postData.imgUrl} alt="Product" />
        </div>
        <div className="rightSection">
          <div className="productDetails">
            <p>&#x20B9; {postData.price}</p>
            <span>{postData.productName}</span>
            <p>{postData.category}</p>
            <span>{postData.createdAt}</span>
          </div>
          <div className="contactDetails">
            <p>Seller details</p>
            <p>
              Posted by: {userDetails ? userDetails.userName : "Loading..."}
            </p>
            <p>Contact: {userDetails ? userDetails.phone : "Loading..."}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default View;
