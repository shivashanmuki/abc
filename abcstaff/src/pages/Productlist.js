import React, { useEffect, useState } from "react";
import { Table, message, Modal, Form, Input, Button, Select } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import axios from "axios";

const { Option } = Select;

const columns = [
  {
    title: "Product ID",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Availability Status",
    dataIndex: "availability",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8088/product/${id}`);
        message.success("Product deleted successfully!");
        dispatch(getProducts());
      } catch (error) {
        message.error("Failed to delete the product. Please try again.");
      }
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    form.setFieldsValue({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      availability: product.isAvailable,
    });
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = form.getFieldsValue();
      await axios.put(`http://localhost:8088/product/${currentProduct.id}`, {
        ...currentProduct,
        ...values,
      });
      message.success("Product updated successfully!");
      setIsModalVisible(false);
      dispatch(getProducts());
    } catch (error) {
      message.error("Failed to update the product. Please try again.");
    }
  };

  const data1 = productState.map((product, index) => ({
    key: product.id,
    name: product.name,
    description: product.description || "No description",
    category: product.category,
    price: `${product.price}`,
    availability:
      product.isAvailable === "Available" ? "Available" : "Unavailable",
    action: (
      <>
        <BiEdit
          onClick={() => handleEdit(product)}
          className="fs-3 text-danger cursor-pointer"
        />
        <AiFillDelete
          onClick={() => handleDelete(product.id)}
          className="ms-3 fs-3 text-danger cursor-pointer"
        />
      </>
    ),
  }));

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>

      <Modal
        title="Edit Product"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpdate}>
            Update
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Product Name"
            name="name"
            rules={[
              { required: true, message: "Please input the product name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[
              { required: true, message: "Please input the product category!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please input the product price!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Availability"
            name="availability"
            rules={[
              {
                required: true,
                message: "Please select the availability status!",
              },
            ]}
          >
            <Select>
              <Option value="Available">Available</Option>
              <Option value="Unavailable">Unavailable</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Productlist;
