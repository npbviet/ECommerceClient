import styles from "./LongDesc.module.css";

import Button from "../../components/Button";

const LongDesc = (props) => {
  //Chỉnh lại format đoạn mô tả chi tiết
  const formattedText = props.item.long_desc
    ? props.item.long_desc.replace(/•/g, "-")
    : "";

  return (
    <section className={styles.longDesc}>
      <Button className={styles.buttonDesc}>DESCRIPTION</Button>
      <h1>PRODUCT DESCRIPTION</h1>
      <pre>{formattedText}</pre>
    </section>
  );
};

export default LongDesc;
