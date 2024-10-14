import { useState } from "react";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import Post from "../components/Posts/Post";
import Footer from "../components/Footer/Footer";

function Home() {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="homeParentDiv">
      <Header setSearchText={setSearchText} /> {/* Corrected prop name */}
      <Banner />
      <Post searchText={searchText} />
      <Footer />
    </div>
  );
}

export default Home;
