import { Box, useTheme, Button } from "@mui/material";

import { tokens } from "../../theme";

import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import { ApiUrl } from "../../ApiRUL";
import { deleteData, getData, postData, putData } from "../../methods";
import EnquiryTab from "./EnquiryTab";
import { useLocation } from "react-router-dom";

const EnquiryAdd = () => {
  const theme = useTheme();
  const location = useLocation();
  let data = location.state || null;
  const [AddEnquiry, setAddEnquiry] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  let InitialData = {
    excutive: "",
    customer: "",
    email: "",
    cont1: "",
    cont2: "",
    address: "",
    city: "",
    category: "",
    reference: "",
    service: "",
  };
  const [PayloadData, setPayloadData] = useState(InitialData);
  const [ServiceData, setServiceData] = useState([]);
  const [Enquiry, setEnquiry] = useState([]);
  const [Category, setCategory] = useState([]);
  const handleChange = (e) => {
    let { name, value } = e.target;

    setPayloadData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [EnquiryId, setEnquiryId] = useState(`VHS${Enquiry?.length + 1}`);

  useEffect(() => {
    let findEnquir = Enquiry?.find((ele) => ele._id === data);

    setPayloadData({
      excutive: findEnquir?.excutive,
      customer: findEnquir?.customer,
      email: findEnquir?.email,
      cont1: findEnquir?.contact1,
      cont2: findEnquir?.contact2,
      address: findEnquir?.address,
      city: findEnquir?.city,
      category: findEnquir?.category,
      service: findEnquir?.service,
      reference: findEnquir?.reference,
    });

    if (findEnquir?.enquiryDate) {
      setCurrentDate(new Date(findEnquir?.enquiryDate));
    }
    if (Enquiry?.length > 0) {
      setEnquiryId(`VHS${Enquiry?.length + 1}`);
    }
    setEnquiryId(findEnquir?.enquiryId);
  }, [data, Enquiry]);

  useEffect(() => {
    getService();
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getService = async () => {
    try {
      const response = await getData(ApiUrl.GETSERVICE);
      const res = await getData(ApiUrl.GETENQUIRY);
      const category = await getData(ApiUrl.GETCATEGORY);
      if (category.status === 200) {
        setCategory(category.data);
      }
      if (res.status === 200) {
        setEnquiry(res.data);
      }
      if (response.status === 200) {
        setServiceData(response.data);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  const handleAddData = async () => {
    try {
      const response = await postData(ApiUrl.ADDENQUIRY, {
        enquiryId: EnquiryId,
        enquiryDate: currentDate,
        excutive: PayloadData.excutive,
        customer: PayloadData.customer,
        email: PayloadData.email,
        contact1: PayloadData.contact1,
        contact2: PayloadData.contact2,
        address: PayloadData.address,
        city: PayloadData.city,
        category: PayloadData.category,
        reference: PayloadData.reference,
        service: PayloadData.service,
      });

      if (response.status === 200) {
        alert(response.data.message);
        setPayloadData(InitialData);
        setAddEnquiry(false);
        window.location.assign("/enquiry");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleUpdateData = async () => {
    try {
      const response = await putData(ApiUrl.UPDATENQUIRY + data, {
        enquiryId: EnquiryId,
        enquiryDate: currentDate,
        excutive: PayloadData.excutive,
        customer: PayloadData.customer,
        email: PayloadData.email,
        contact1: PayloadData.cont1,
        contact2: PayloadData.cont2,
        address: PayloadData.address,
        city: PayloadData.city,
        category: PayloadData.category,
        reference: PayloadData.reference,
        service: PayloadData.service,
      });

      if (response.status === 200) {
        alert(response.data.message);
        setPayloadData(InitialData);
        setAddEnquiry(false);
        window.location.assign("/enquiry");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <Box m="20px">
      <EnquiryTab />
      <div>
        <div className="row m-auto">
          <Header
            subtitle={isEditMode ? "Edit the Enquiry" : "Create a New Enquiry"}
          />

          <div className="row m-auto border">
            <div className="col-md-10 m-auto p-4">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <Form.Label>Enquiry ID</Form.Label>
                  <Form.Control
                    value={EnquiryId}
                    type="text"
                    readOnly
                    name="enquiryId"
                  />
                </div>{" "}
                <div className="col-md-4 mb-3">
                  <Form.Label>Enquiry Date</Form.Label>
                  <Form.Control
                    value={currentDate?.toLocaleDateString()}
                    type="text"
                    name="enquiryDate"
                    readOnly
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Label>Executive</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={PayloadData.excutive}
                    type="text"
                    name="excutive"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={PayloadData.customer}
                    type="text"
                    name="customer"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Label>
                    Email Id <span className="red">*</span>
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={PayloadData.email}
                    type="text"
                    name="email"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Label>
                    Contact 1 <span className="red">*</span>
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={PayloadData.cont1}
                    type="text"
                    name="cont1"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Label>Contact 2</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={PayloadData.cont2}
                    type="text"
                    name="cont2"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={PayloadData.address}
                    type="text"
                    name="address"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Label>
                    City <span className="red">*</span>
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={PayloadData.city}
                    type="text"
                    name="city"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Label>
                    Category <span className="red">*</span>
                  </Form.Label>
                  <Form.Select
                    onChange={handleChange}
                    value={PayloadData.category}
                    type="text"
                    name="category"
                  >
                    <option>Select Category</option>
                    {Category?.map((ele) => (
                      <option value={ele.category}>{ele.category}</option>
                    ))}
                  </Form.Select>
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Label>
                    {" "}
                    Reference <span className="red">*</span>
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={PayloadData.reference}
                    type="text"
                    name="reference"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Label>
                    {" "}
                    Service <span className="red">*</span>
                  </Form.Label>
                  <Form.Select
                    onChange={handleChange}
                    value={PayloadData.service}
                    type="text"
                    name="service"
                  >
                    <option>Select Service</option>
                    {ServiceData?.map((ele) => (
                      <option value={ele.servicename}>{ele.servicename}</option>
                    ))}
                  </Form.Select>
                </div>
              </div>{" "}
              <div className="row mt-3">
                <div className="col-md-5 m-auto">
                  <div className="row m-auto">
                    {!data ? (
                      <button
                        className="col-md-4 m-auto p-1 save me-2"
                        onClick={handleAddData}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="col-md-4 m-auto p-1 save me-2"
                        onClick={handleUpdateData}
                      >
                        update
                      </button>
                    )}{" "}
                    <button className="col-md-4 m-auto p-1 save ">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default EnquiryAdd;
