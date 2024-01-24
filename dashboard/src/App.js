import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { ResetPassword } from "./Pages/ResetPassword";
import { ForgotPassword } from "./Pages/ForgotPassword";
import { MainLayout } from "./Components/MainLayout";
import { Dashboard } from "./Pages/Dashboard";
import { Enquiries } from "./Pages/Enquiries";
import { BlogList } from "./Pages/BlogList";
import { BlogCatList } from "./Pages/BlogCatList";
import { Orders } from "./Pages/Orders";
import { Customers } from "./Pages/Customers";
import { CategoryList } from "./Pages/CategoryList";
import { BrandList } from "./Pages/BrandList";
import { ProductList } from "./Pages/ProductList";
import { ColorList } from "./Pages/ColorList";
import { AddBlog } from "./Pages/AddBlog";
import { AddBlogCat } from "./Pages/AddBlogCat";
import { AddColor } from "./Pages/AddColor";
import { AddCategory } from "./Pages/AddCategory";
import { AddBrand } from "./Pages/AddBrand";
import { AddProduct } from "./Pages/AddProduct";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="blog-list" element={<BlogList />} />
            <Route path="blog" element={<AddBlog />} />
            <Route path="blog-category-list" element={<BlogCatList />} />
            <Route path="blog-category" element={<AddBlogCat />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="category-list" element={<CategoryList />} />
            <Route path="category" element={<AddCategory />} />
            <Route path="color-list" element={<ColorList />} />
            <Route path="color" element={<AddColor />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="product" element={<AddProduct />} />
            <Route path="brand-list" element={<BrandList />} />
            <Route path="brand" element={<AddBrand />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
