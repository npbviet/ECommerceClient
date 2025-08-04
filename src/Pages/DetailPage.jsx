import { useEffect, useState, useMemo } from "react";
import DetailItem from "../features/DetailPage/DetailItem";
import { useParams, useRouteLoaderData } from "react-router-dom";

import LongDesc from "../features/DetailPage/LongDesc";
import styles from "../features/DetailPage/DetailPage.module.css";
import RelatedSection from "../features/DetailPage/RelatedSection";

const DetailPage = () => {
  useEffect(() => {
    // Cuộn về đầu trang khi trang này được render
    window.scrollTo(0, 0);
  }, []);

  const params = useParams();
  const data = useRouteLoaderData("root").productList;

  // Tính toán detailItem chỉ khi params.productId hoặc data thay đổi
  const detailItem = useMemo(() => {
    if (!data || data.length === 0) return null;
    return params.productID
      ? data.find((item) => item._id === params.productID) || data[0]
      : data[0];
  }, [params.productID, data]);

  if (!detailItem) {
    return <p>Item not found</p>;
  }
  // Tính toán các relatedItems khi detailItem thay đổi
  const relatedItems = useMemo(() => {
    if (!detailItem) return [];
    return data.filter(
      (item) =>
        item.category === detailItem.category && item._id !== detailItem._id
    );
  }, [detailItem, data]);

  if (!detailItem) {
    return <p>Item not found</p>;
  }

  return (
    <div className={styles.detailPage}>
      <DetailItem item={detailItem} />
      <LongDesc item={detailItem} />
      <RelatedSection items={relatedItems} />
    </div>
  );
};

export default DetailPage;
