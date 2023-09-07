import "./AddProduct.css";
import React from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import FormikControl from "./FormikControl";
import TextError from "./TextError";
import axios from "axios";
import ToastMessage from "./ToastMessage";
import { useSelector } from "react-redux";
const initialAddProduct = {
  productName: "",
  productCategory: "",
  animeName: "",
  rating: 1,
  imageUrls: [""],
  gender: "",
  price: 1,
  oldPrice: 1,
  stock: "",
  stockQuantity: 20,
  isNew: false,
  productColor: "",
  productSpecification: "",
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
  isNew: Yup.boolean().required("Required"),
  productColor: Yup.string().required("Color is Required"),
  productSpecification: Yup.string().required("Specification is required"),
});

export const productColorList = [
  { key: "Select an option", value: "" },
  { key: "Red", value: "Red" },
  { key: "Orange", value: "Orange" },
  { key: "Yellow", value: "Yellow" },
  { key: "Green", value: "Green" },
  { key: "Blue", value: "Blue" },
  { key: "Purple", value: "Purple" },
  { key: "Pink", value: "Pink" },
  { key: "Brown", value: "Brown" },
  { key: "Black", value: "Black" },
  { key: "White", value: "White" },
  { key: "Gray", value: "Gray" },
  { key: "None", value: "None" },
];

export const productSpecificationList = [
  { key: "Trending", value: "Trending" },
  { key: "Popular", value: "Popular" },
  { key: "New Arrival", value: "New Arrival" },
  { key: "New Season", value: "New Season" },
  { key: "Best Seller", value: "Best Seller" },
  { key: "None", value: "None" },
];
export const genderOptions = [
  { key: "Male", value: "Male" },
  { key: "Female", value: "Female" },
  { key: "Unisex", value: "Unisex" },
];
export const isNewOptions = [
  { key: "true", value: "true" },
  { key: "false", value: "false" },
];
export const stockOptions = [
  { key: "In Stock", value: "In Stock" },
  { key: "Out of Stock", value: "Out of Stock" },
];

export const animedropdownNames = [
  { key: "Select an option", value: "" },
  { key: "One Piece", value: "One Piece" },
  { key: "Naruto", value: "Naruto" },
  { key: "Demon Slayer", value: "Demon Slayer" },
  { key: "Dragon Ball", value: "Dragon Ball" },
  { key: "Jujustu Kaisen", value: "Jujustu Kaisen" },
  { key: "Tokyo Revengers", value: "Tokyo Revengers" },
  { key: "Attack On Titan", value: "Attack On Titan" },
  { key: "Other", value: "Other" },
];

export const categorydropdown = [
  { key: "Select an option", value: "" },
  { key: "T-Shirts", value: "T-Shirts" },
  { key: "OverSized-T-Shirts", value: "OverSized-T-Shirts" },
  { key: "Tank Top", value: "Tank Top" },
  { key: "Joggers", value: "Joggers" },
  { key: "Boxers", value: "Boxers" },
  { key: "Hoodies", value: "Hoodies" },
  { key: "Jackets", value: "Jackets" },
  { key: "Sweatshirts", value: "Sweatshirts" },
  { key: "Shoes", value: "Shoes" },
  { key: "Caps", value: "Caps" },
  { key: "Stickers", value: "Stickers" },
  { key: "Posters", value: "Posters" },
  { key: "Bags", value: "Bags" },
  { key: "Solid OverSized-T-Shirts ", value: "Solid OverSized-T-Shirts" },
  { key: "Combos", value: "Combos" },
];

function AddProduct() {
  const user = useSelector((state) => state.user.user) || {};
  document.title = "Admin/SaveProduct";
  const userId = user.userId;
  const token = user.jwtToken;
  const onSubmit = (values, formikHelpers) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post("http://localhost:8080/product/save/" + userId, values)
      .then((response) => {
        if (response.data.message === "Product Has Been Saved in DB") {
          ToastMessage({ type: "success", message: "Successfully Added" });
          formikHelpers.resetForm();
        } else {
          ToastMessage({ type: "error", message: response.data.message });
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="addproduct">
      <div className="addheader">
        <span>ADD NEW PRODUCT</span>
      </div>
      <div className="addform">
        <Formik
          initialValues={initialAddProduct}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => (
            <Form className="totalform">
              <div>
                <FormikControl
                  control="input"
                  type="text"
                  label="Product Name : "
                  name="productName"
                />
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
                <FormikControl
                  control="radio"
                  label="For Gender : "
                  name="gender"
                  options={genderOptions}
                />
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
                <FormikControl
                  control="radio"
                  label="Stock : "
                  name="stock"
                  options={stockOptions}
                />
                <FormikControl
                  control="input"
                  type="number"
                  label="Quantity : "
                  name="stockQuantity"
                />
              </div>
              <div className="imagecontrol">
                <div>
                  <label>
                    <span>List Of Images :</span>{" "}
                  </label>
                  <span className="spamimg">
                    (Add 5 Images Urls only / Click + to Add Images)
                  </span>
                </div>
                <FieldArray name="imageUrls">
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { imageUrls } = values;
                    return (
                      <div className="listimages">
                        {imageUrls?.map((image, index) => (
                          <div key={index}>
                            <Field name={`imageUrls[${index}]`} />
                            {index > 0 && index < 5 && (
                              <button
                                className="addimges"
                                type="button"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            )}
                            {index < 5 ? (
                              <button
                                className="addimges"
                                type="button"
                                disabled={imageUrls.length >= 5}
                                onClick={() => push("")}
                              >
                                +
                              </button>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
                <ErrorMessage name="imageUrls" component={TextError} />
              </div>
              <div className="submitb">
                <button type="submit" disabled={!formik.isValid}>
                  S U B M I T
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddProduct;
