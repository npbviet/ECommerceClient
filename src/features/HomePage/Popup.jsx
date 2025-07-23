import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Fragment } from "react";

import { popupActions } from "../../Store/StatePopup";

import styles from "../../components/Modale.module.css";
import Button from "../../components/Button";
import classes from "./Popup.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Popup(props) {
  const navigate = useNavigate();
  function navigateHandler() {
    navigate(`/detail/${props.item._id}`);
  }
  const dispatch = useDispatch();
  const closePopupHandler = (event) => {
    event.preventDefault();
    dispatch(popupActions.HIDE_POPUP());
  };
  return (
    <Fragment>
      <div className={styles.modal}>
        <div className={classes.flexPopup}>
          <img src={props.item.img1} alt={props.item.name} />
          <div className={classes.containerPopup}>
            <h1>{props.item.name}</h1>
            <h2>{Number(props.item.price).toLocaleString(`de-DE`)} VND</h2>
            <p>{props.item.short_desc}</p>
            <Button onClick={navigateHandler}>
              <FontAwesomeIcon
                className={classes.icon}
                icon="fa-solid fa-cart-shopping"
              />
              View Detail
            </Button>
          </div>
          <div className={classes.buttonX} onClick={closePopupHandler}>
            X
          </div>
        </div>
      </div>
      <div className={styles.backdrop}></div>
    </Fragment>
  );
}

export default Popup;
