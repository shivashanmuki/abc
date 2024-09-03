import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getEnquiryResponses,
  resetState,
  sendEnquiryResponse,
} from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";
import "./ViewEnq.css";
import { string } from "yup";

const ViewEnq = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEnqId = location.pathname.split("/")[3];
  const enqState = useSelector((state) => state.enquiry);
  const [responses, setResponses] = useState([]);
  const [newResponse, setNewResponse] = useState("");
  const { isLoading, isError, message } = enqState;

  useEffect(() => {
    dispatch(getEnquiryResponses(getEnqId)).then((response) => {
      setResponses(response.payload || []);
    
    });

    return () => {
      dispatch(resetState());
    };
  }, [getEnqId, dispatch]);

  const goBack = () => {
    navigate(-1);
  };

  const handleReplyChange = (e) => {
    setNewResponse(e.target.value);
  };

const handleReplySubmit = (e) => {
  e.preventDefault();
  if (newResponse.trim()) {
    const storedData = localStorage.getItem("staff");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const email = parsedData.data.email; 
      if (email) {
        dispatch(
          sendEnquiryResponse({
            enquiryId: getEnqId,
            comments: newResponse,
            user: email,
          })
        ).then(() => {
          dispatch(getEnquiryResponses(getEnqId)).then((response) => {
            setResponses(response.payload || []);
          });
          setNewResponse("");
        });
      } else {
        console.error("Email not found in stored data");
      }
    } else {
      console.error("User data not found in localStorage");
    }
  }
};


  return (
    <div className="view-enq-container">
      <div className="header d-flex justify-content-between align-items-center">
        <h3 className="title">Responses</h3>
        <button className="go-back-btn" onClick={goBack}>
          <BiArrowBack className="icon" /> Go Back
        </button>
      </div>
      <div className="responses-section mt-5">
        {isLoading && <p className="loading-text">Loading...</p>}
        {isError && <p className="error-text">Error: {message}</p>}
        {responses.length > 0 ? (
          <div className="responses-list">
            {responses.map((response) => (
              <div key={response.id} className="response-card">
                <div className="response-header">
                  <h6 className="response-id">Response ID: {response.id}</h6>
                  <span className="response-date">
                    {response.responseEnq.date || "Date not available"}
                  </span>
                </div>
                <p className="response-comments">
                  <strong>Comments:</strong> {response.responseEnq.comments}
                </p>
                <p className="response-user">
                  <strong>User:</strong> {response.responseEnq.user}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-responses">No responses available.</p>
        )}
      </div>

      <form className="reply-box" onSubmit={handleReplySubmit}>
        <textarea
          className="reply-input"
          placeholder="Write a reply..."
          value={newResponse}
          onChange={handleReplyChange}
        />
        <button type="submit" className="reply-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ViewEnq;
