import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAEnquiry,
  getEnquiries,
  resetState,
} from "../features/enquiry/enquirySlice";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "User ID",
    dataIndex: "userId",
  },
  {
    title: "Query ID",
    dataIndex: "queryId",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
  },
  {
    title: "Email Address",
    dataIndex: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
  },
  {
    title: "Comments",
    dataIndex: "comments",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enqId, setEnqId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setEnqId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, [dispatch]);

  const enqState = useSelector((state) => state.enquiry.enquiries);

  // Ensure enqState is an array and properly map it to data1
  const data1 = enqState.map((item, index) => {
    const { enquiries } = item;
    const user = enquiries.users;

    return {
      key: index + 1,
      queryId: enquiries.id,
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName || "",
      email: enquiries.email,
      phoneNumber: enquiries.phone || user.phone,
      comments: enquiries.comments,
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/staff/enquiries/${enquiries.id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(enquiries.id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    };
  });

  const deleteEnq = (id) => {
    dispatch(deleteAEnquiry(id))
      .unwrap()
      .then(() => {
        dispatch(getEnquiries());
      })
      .catch((error) => {
        console.error("Error deleting enquiry:", error);
      });
    setOpen(false);
  };

  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteEnq(enqId)}
        title="Are you sure you want to delete this enquiry?"
      />
    </div>
  );
};

export default Enquiries;
