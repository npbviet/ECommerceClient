import { useEffect, useState } from "react";
import styles from "./DetailItem.module.css";
import Quantity from "./Quantity";

const DetailItem = (props) => {
  const [activeImage, setActiveImage] = useState("");
  // Cập nhật hình ảnh đầu khi props.item thay đổi
  useEffect(() => {
    if (props.item?.img1) {
      setActiveImage(props.item.img1);
    }
  }, [props.item]);
  const images = [
    { src: props.item.img1, alt: "Image 1" },
    { src: props.item.img2, alt: "Image 2" },
    { src: props.item.img3, alt: "Image 3" },
    { src: props.item.img4, alt: "Image 4" },
  ];
  const handleClick = (src) => {
    setActiveImage(src);
  };

  return (
    <section className={styles.detailItem}>
      <div className={styles.gridDetail}>
        <ul>
          {images.map((image, index) => (
            <li key={index} onClick={() => handleClick(image.src)}>
              <img
                src={image.src}
                alt={image.alt}
                className={activeImage === image.src ? styles.active : ""}
              />
            </li>
          ))}
        </ul>
        <div>
          <img src={activeImage} alt="Active" />
        </div>
        <div className={styles.shortDesc}>
          <h1>{props.item.name}</h1>
          <h2>{Number(props.item.price).toLocaleString(`de-DE`)} VND</h2>
          <p>{props.item.short_desc}</p>
          <div className={styles.shortDesc_category}>
            CATEGORY: <span>{props.item.category}</span>
          </div>
          <Quantity items={props.item} />
        </div>
      </div>
    </section>
  );
};

export default DetailItem;
