import React from "react";
import Header from "../../components/Header";
import PageLayout from "../../components/PageLayout";
import Conj200 from "../../modules/Home/Hero/Conj200";
import Products from "../../modules/Home/Products";

const Home = () => {
  const [darkMode, setDarkMode] = React.useState(true);
  return (
    <PageLayout darkMode={darkMode}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Conj200 />
      <Products />
    </PageLayout>
  );
};

export default Home;
