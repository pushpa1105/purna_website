import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import HomePage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import ProductInfo from "./Pages/ProductInfo";
import ShoppingCart from "./Pages/ShoppingCart";
import OrdersPage from "./Pages/OrdersPage";
import AdminPage from "./Pages/AdminPage";
import ShopPage from "./Pages/ShopPage";
import CustomCarpet from "./Pages/CustomCarpetPage";
import AboutUs from "./Pages/AboutUsPage";
import ContactUs from "./Pages/ContactUsPage";
import { AdminRoutes } from "./MyComponents/checkUserIsAdmin";

function App() {
  /*
  useEffect(() => {
    const { setCurrentUser, currentUser } = props;
    const auth = userAuth();
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({ id: snapshot.id, ...snapshot.data() });
        });
      }
    });

    return () => {
      authListener();
    };
  }, []);
 */

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/shop" exact element={<ShopPage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/custom-carpet" exact element={<CustomCarpet />} />
          <Route path="/about-us" exact element={<AboutUs />} />
          <Route path="/contact-us" exact element={<ContactUs />} />
          <Route path="/register" exact element={<Registration />} />
          <Route
            path="/productinfo/:productid"
            exact
            element={<ProductInfo />}
          />
          <Route
            path="/orders"
            exact
            element={
              <ProtectedRoutes>
                <OrdersPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin"
            exact
            element={
              <AdminRoutes>
                <AdminPage />
              </AdminRoutes>
            }
          />
          <Route
            path="/cart"
            exact
            element={
              <ProtectedRoutes>
                <ShoppingCart />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("currentUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
