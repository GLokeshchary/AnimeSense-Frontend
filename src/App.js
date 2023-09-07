import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayOut from "./Layouts/RootLayOut";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SingleProduct from "./components/SingleProduct";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Information from "./components/Information";
import Shipping from "./components/Shipping";
import CheckOut from "./components/CheckOut";
import Payment from "./components/Payment";
import Account from "./components/Account";
import Orders from "./components/Orders";
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import AdminDashBoard from "./components/AdminDashBoard";
import AdminOrders from "./components/AdminOrders";
import AdminCustomers from "./components/AdminCustomers";
import AdminProducts from "./components/AdminProducts";
import EmptyCart from "./components/EmptyCart";
import BuyNowPage from "./components/BuyNowPage";
import BuyNowShipping from "./components/BuyNowShipping";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayOut />}>
      <Route path="/" element={<HomePage />}></Route>
      <Route
        exact
        path="/product/:productId"
        element={<SingleProduct />}
      ></Route>
      <Route path="/products/:name" element={<Products />}></Route>
      <Route
        path="/products/:name/product/:productId"
        element={<SingleProduct />}
      ></Route>

      <Route path="/cart" element={<Cart />}></Route>
      <Route
        path="/cart/product/:productId"
        element={<SingleProduct />}
      ></Route>
      <Route path="/wishlist" element={<Wishlist />}></Route>
      <Route
        path="/wishlist/product/:productId"
        element={<SingleProduct />}
      ></Route>
      <Route
        path="/admin/a-products/product/:productId"
        element={<SingleProduct />}
      />
      <Route
        path="/product/:productId/product/:productId"
        element={<SingleProduct />}
      />
      <Route path="/account/product/:productId" element={<SingleProduct />} />
      <Route path="/admin" element={<Admin />}>
        <Route index element={<AdminDashBoard />} />
        <Route path="dashboard" element={<AdminDashBoard />} />
        <Route path="a-orders" element={<AdminOrders />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="a-products" element={<AdminProducts />} />
        <Route path="saveProduct" element={<AddProduct />}></Route>
      </Route>
      <Route path="/register" element={<SignupPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/checkout" element={<CheckOut />}>
        <Route index element={<Information />} />
        <Route path="information" element={<Information />} />
        <Route path="shipping" element={<Shipping />}></Route>
      </Route>
      <Route path="/bcheckout" element={<BuyNowPage />}>
        <Route index element={<Information />} />
        <Route path="information" element={<Information />} />
        <Route path="bshipping" element={<BuyNowShipping />}></Route>
      </Route>
      <Route path="/account" element={<Account />}>
        <Route index element={<Orders />} />
        <Route path="orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route
        path="*"
        element={
          <EmptyCart
            name="404"
            image="https://i.pinimg.com/originals/91/42/e2/9142e268362466b17db9f1e72677ccdd.gif"
          />
        }
      ></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
