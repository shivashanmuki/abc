import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import {
  createCategory,
  getAProductCategory,
  resetState,
  updateAProductCategory,
} from "../features/pcategory/pcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Service Name is Required"),
  description: yup.string().required("Service Description is Required"),
});

const AddService = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getPCatId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.pCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    categoryDescription,
    updatedCategory,
  } = newCategory;

  useEffect(() => {
    if (getPCatId !== undefined) {
      dispatch(getAProductCategory(getPCatId));
    } else {
      dispatch(resetState());
    }
  }, [getPCatId]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Service Added Successfully!");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Service Updated Successfully!");
      navigate("/admin/list-services");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
      description: categoryDescription || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // console.log(getPCatId)
      // console.log(values)
      if (getPCatId !== undefined) {
       const data = { id: getPCatId, pCatData: values };
     //  dispatch(updateAProductCategory(data));
       updateProductCategory(data); 
      //  dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  const updateProductCategory = async (category) => {
    const response = await axios.put(
      `http://localhost:8088/services/${category.id}`,
      category.pCatData
    );
    return response;
  };

  return (
    <div>
      <h3 className="mb-4  title">
        {getPCatId !== undefined ? "Edit" : "Add"} Service
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Service Name"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="service-name"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <CustomInput
            type="text"
            label="Enter Service Description"
            onChng={formik.handleChange("description")}
            onBlr={formik.handleBlur("description")}
            val={formik.values.description}
            id="service-description"
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getPCatId !== undefined ? "Edit" : "Add"} Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
