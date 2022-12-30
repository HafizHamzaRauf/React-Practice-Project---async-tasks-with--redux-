import { useDispatch, useSelector } from "react-redux";
import { showCartActions } from "../../store/showCart";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cartItems.totalQuantity);
  const showCartHandler = () => {
    dispatch(showCartActions.toggleCart());
  };
  return (
    <button onClick={showCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
