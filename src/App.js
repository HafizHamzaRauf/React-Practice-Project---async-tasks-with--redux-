import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCartData, sendCartData } from "./store/cartItems";
let initialState = true;
function App() {
  const showCart = useSelector((state) => state.showCart.showCart);
  const cart = useSelector((state) => state.cartItems);
  const notification = useSelector((state) => state.showCart.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (initialState) {
      dispatch(fetchCartData());
      initialState = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        ></Notification>
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
