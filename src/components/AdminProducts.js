import React, { useEffect, useState } from "react";
import "./AdminProducts.css";
import axios from "axios";
import Card from "./Card";
import * as Yup from "yup";
import { Box, Modal, Pagination } from "@mui/material";
import Loading from "./Loading";
import EditIcon from "@mui/icons-material/Edit";
import EmptyCart from "./EmptyCart";
import Swal from "sweetalert2";
import {
  animedropdownNames,
  categorydropdown,
  genderOptions,
  isNewOptions,
  productColorList,
  productSpecificationList,
  stockOptions,
} from "./AddProduct";
import { Form, Formik } from "formik";
import FormikControl from "./FormikControl";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};
const validationSchema = Yup.object({
  productName: Yup.string().required("ProductName is required"),
  productCategory: Yup.string().required("Product Catergory is required"),
  animeName: Yup.string().required("Anime Name is required"),
  rating: Yup.number()
    .required("Please Enter Product Rating")
    .min(1, "Rating should be in between 1-5")
    .max(5, "Rating should be in between 1-5"),
  // imageUrls:Yup.string().required('Please Enter Product ImageUrls'),
  gender: Yup.string().required("Please Enter Gender"),
  price: Yup.number().required("Please Enter Product Price"),
  oldPrice: Yup.number().required("Please Enter Product OldPrice"),
  stock: Yup.string().required("Stock quantity is reqiured"),
  stockQuantity: Yup.number().required("quantity is required"),
  productColor: Yup.string().required("Color is Required"),
  productSpecification: Yup.string().required("Specification is required"),
});
function AdminProducts() {
  const [searchtext, setsearchtext] = useState("");
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setPage] = useState(1);
  const [open, setopen] = useState(false);
  const [modalproduct, setmodalproduct] = useState({});
  document.title = "Admin/Products";
  const handleChangePage = (eevnt, value) => {
    setPage(value);
  };

  const itemsPerPage = 9;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  const fetchAllProducts = () => {
    axios.get("http://localhost:8080/product/all").then((response) => {
      const filterproductsbytime = response.data
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setproducts(filterproductsbytime);
      setloading(false);
    });
  };
  useEffect(() => {
    fetchAllProducts();
    const intervalId = setInterval(() => {
      fetchAllProducts();
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchtext.toLowerCase()) ||
      product.productCategory.toLowerCase() === searchtext.toLowerCase() ||
      product.animeName.toLowerCase() === searchtext.toLowerCase()
  );
  const initialProductValues = {
    productName: modalproduct.productName,
    productCategory: modalproduct.productCategory,
    animeName: modalproduct.animeName,
    rating: modalproduct.rating,
    gender: modalproduct.gender,
    price: modalproduct.price,
    oldPrice: modalproduct.oldPrice,
    stock: modalproduct.stock,
    stockQuantity: modalproduct.stockQuantity,
    productColor: modalproduct.productColor,
    productSpecification: modalproduct.productSpecification,
  };
  const onSubmit = (values) => {
    setopen(false);
    axios
      .post(
        "http://localhost:8080/product/update/" + modalproduct.productId,
        values
      )
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) {
          Swal.fire({
            title: `Successfully ${response.data.message}`,
            icon: "success",
            showConfirmButton: true,
            timer: 3500,
          });
        }
      });
  };
  if (loading === true) {
    return <Loading />;
  }
  return (
    <div className="adminpr-container">
      <h1>PRODUCTS</h1>
      <div className="ap-search">
        <input
          type="text"
          placeholder="Search for products here...!"
          onChange={(e) => setsearchtext(e.target.value)}
        />
      </div>
      <div className="ap-content">
        {searchtext === "" ? (
          <div>
            <div className="ap-card">
              {paginatedProducts.map((product, i) => (
                <div className="ap-edit" key={i}>
                  <Card product={product} />
                  <div className="apbutton">
                    <button
                      onClick={() => {
                        setopen(true);
                        setmodalproduct(product);
                      }}
                    >
                      <div className="appppppp">
                        <EditIcon />
                        <strong>Edit</strong>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination">
              <Pagination
                count={Math.ceil(products.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
                size="large"
                color="primary"
              />
            </div>
          </div>
        ) : (
          <div className="ap-card">
            {filteredProducts.length === 0 ? (
              <EmptyCart
                image="https://media.tenor.com/B_U69Q8sALgAAAAC/one-piece-no.gif"
                name="No Product Found"
                admin={true}
              />
            ) : (
              filteredProducts.map((filterproduct, i) => (
                <Card key={i} product={filterproduct} />
              ))
            )}
          </div>
        )}
      </div>
      {open && (
        <Modal
          open={open}
          onClose={() => setopen(!open)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="editcontianer">
              <h3>EDIT PRODUCT</h3>
              <div className="editform">
                <Formik
                  initialValues={initialProductValues}
                  validationSchema={validationSchema}
                  validateOnMount
                  onSubmit={onSubmit}
                >
                  {(formik) => (
                    <Form>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Product Name : "
                        name="productName"
                      />
                      <div className="onerowform">
                        <FormikControl
                          control="select"
                          label="Anime Name : "
                          name="animeName"
                          options={animedropdownNames}
                        />
                        <FormikControl
                          control="select"
                          label="Category : "
                          name="productCategory"
                          options={categorydropdown}
                        />
                      </div>
                      <div className="onerowform">
                        <FormikControl
                          control="select"
                          label="Product color : "
                          name="productColor"
                          options={productColorList}
                        />
                        <FormikControl
                          control="select"
                          label="Specification : "
                          name="productSpecification"
                          options={productSpecificationList}
                        />
                      </div>
                      <FormikControl
                        control="input"
                        type="number"
                        label="Rating : "
                        min="1"
                        max="5"
                        name="rating"
                      />
                      <FormikControl
                        control="input"
                        type="number"
                        label="Price : "
                        min="1"
                        max="5000"
                        name="price"
                      />
                      <FormikControl
                        control="input"
                        type="number"
                        label="Old Price : "
                        min="1"
                        max="5000"
                        name="oldPrice"
                      />
                      <div className="onerowform">
                        <FormikControl
                          control="radio"
                          label="Stock : "
                          name="stock"
                          options={stockOptions}
                        />
                        <FormikControl
                          control="radio"
                          label="For Gender : "
                          name="gender"
                          options={genderOptions}
                        />
                      </div>
                      <FormikControl
                        control="input"
                        type="number"
                        label="Quantity : "
                        name="stockQuantity"
                      />
                      <div className="editbuttonap">
                        <button type="submit" disabled={!formik.isValid}>
                          SAVE CHANGES
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default AdminProducts;
