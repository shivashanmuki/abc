import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { createProducts, resetState } from "../features/product/productSlice";

const schema = yup.object().shape({
  name: yup.string().required("Product Name is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
  price: yup.number().required("Price is Required"),
  isAvailable: yup.string().required("Availability Status is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const catState = useSelector((state) => state.pCategory.pCategories);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, createdProduct } = newProduct;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
      navigate("/staff/list-product");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
    dispatch(resetState());
  }, [isSuccess, isError, createdProduct, navigate, dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      isAvailable: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Name"
            name="name"
            onChng={formik.handleChange}
            onBlr={formik.handleBlur}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>

          <ReactQuill
            theme="snow"
            value={formik.values.description}
            onChange={(value) => formik.setFieldValue("description", value)}
            onBlur={() => formik.setFieldTouched("description", true)}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
          >
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChng={formik.handleChange}
            onBlr={formik.handleBlur}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>

          <select
            name="isAvailable"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.isAvailable}
            className="form-control py-3 mb-3"
          >
            <option value="">Select Availability Status</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
          <div className="error">
            {formik.touched.isAvailable && formik.errors.isAvailable}
          </div>
          {/* <CustomInput
            type="text"
            label="Discriptions"
            name="discription"
            onChng={formik.handleChange}
            onBlr={formik.handleBlur}
            val={formik.values.discription}
          />
          <div className="error">
            {formik.touched.discription && formik.errors.discription}
          </div> */}
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
