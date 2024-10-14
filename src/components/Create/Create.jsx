import { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FireBaseContext, AuthContext } from "../../Contexts/Context";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { fireBase, storage } = useContext(FireBaseContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    item_Name: "",
    category: "",
    price: "",
    images: [], // Array to store multiple images
  });

  const [uploadedUrls, setUploadedUrls] = useState([]); // To store the uploaded image URLs

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      // Handle multiple file uploads
      setFormData((prevData) => ({
        ...prevData,
        [name]: Array.from(files), // Store multiple files as an array
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const uploadData = async (e) => {
    e.preventDefault();
    let date = new Date();
    let imageFiles = formData.images; // Assuming formData.images is an array of images
    try {
      // Create an array of upload promises
      const uploadPromises = imageFiles.map(async (image) => {
        const storageRef = ref(storage, `files/${image.name}`);
        // Upload the image to Firebase storage
        const snapshot = await uploadBytes(storageRef, image);
        // Get the image download URL after upload
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log(`Uploaded: ${image.name}, URL: ${downloadURL}`);
        return downloadURL; // Return the URL
      });

      // Wait for all the uploads and URLs to complete
      const downloadURLs = await Promise.all(uploadPromises);
      if (downloadURLs.length > 0) {
        const docRef = await addDoc(collection(fireBase, "items"), {
          userId: user.uid,
          productName: formData.item_Name,
          category: formData.category,
          price: formData.price,
          imgUrl: downloadURLs,
          createdAt: date.toDateString(),
        });
        alert(`Document written with ID: ${docRef.id}`);
      }
      navigate("/");
      console.log("All images uploaded successfully with URLs:", downloadURLs);
    } catch (error) {
      alert("Error uploading images or fetching URLs:", error);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="card">
        <form onSubmit={uploadData}>
          <div className="centerDiv">
            <label htmlFor="item_Name">Item Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="item_Name"
              name="item_Name"
              value={formData.item_Name}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <select
              onChange={handleChange}
              value={formData.category}
              className="input"
              id="category"
              name="category"
            >
              <option value="">Select One</option>
              <option value="automobile">Automobile</option>
              <option value="electronic">Electronic</option>
              <option value="real-estate">Real Estate</option>
              <option value="agriculture">Agriculture</option>
            </select>
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input
              className="input"
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            <br />

            <div className="imagePreview">
              {formData.images &&
                formData.images.length > 0 &&
                formData.images.map((image, index) => (
                  <img
                    key={index}
                    alt={`preview-${index}`}
                    width="200px"
                    height="200px"
                    src={URL.createObjectURL(image)}
                  />
                ))}
            </div>
            <br />
            <input
              onChange={handleChange}
              id="images"
              name="images"
              accept="image/*"
              multiple
              type="file"
            />
            <br />
            <button type="submit" className="uploadBtn">
              Upload and Submit
            </button>

            {uploadedUrls.length > 0 && (
              <div>
                <h3>Uploaded Image URLs:</h3>
                <ul>
                  {uploadedUrls.map((url, index) => (
                    <li key={index}>
                      <a href={url} target="_blank" rel="noreferrer">
                        Image {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;
