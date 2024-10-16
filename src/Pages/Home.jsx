import { useState } from "react";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import Post from "../components/Posts/Post";
import Footer from "../components/Footer/Footer";

function Home() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="homeParentDiv">
      <Header setSearchText={setSearchText} />
      <Banner setSelectedCategory={setSelectedCategory} />
      <Post
        searchText={searchText}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Footer />
    </div>
  );
}

export default Home;
