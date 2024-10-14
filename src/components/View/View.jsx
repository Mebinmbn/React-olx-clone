import { useContext, useEffect, useState } from "react";
import "./View.css";
import { postContext } from "../../contexts/PostsContext";
import { FireBaseContext } from "../../Contexts/Context";
import { collection, getDocs, query, where } from "firebase/firestore";

function View() {
  const { postData } = useContext(postContext);
  const { fireBase } = useContext(FireBaseContext);
  const [userDetails, setUserDetails] = useState(null);
  const { userId } = postData;

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
          <p>{userDetails ? userDetails.userName : "Loading..."}</p>
          <p>{userDetails ? userDetails.phone : "Loading..."}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
