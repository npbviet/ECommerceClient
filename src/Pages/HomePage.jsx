import { useRouteLoaderData } from "react-router-dom";
import Banner from "../features/HomePage/Banner";
import Collection from "../features/HomePage/Collection";
import OtherInformation from "../features/HomePage/OtherInformation";
import TrendingProducts from "../features/HomePage/TrendingProducts";

const HomePage = () => {
  const data = useRouteLoaderData("root").productList;

  return (
    <>
      <Banner />
      <Collection />
      <TrendingProducts data={data} />
      <OtherInformation />
    </>
  );
};

export default HomePage;
