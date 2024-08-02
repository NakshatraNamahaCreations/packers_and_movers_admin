import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import moment from "moment";
import { ApiUrl } from "../../ApiRUL";
import { deleteData, getData, postData, putData } from "../../methods";
import EnquiryTab from "./EnquiryTab";
import DataTable from "react-data-table-component";
import axios from "axios";
import { enquiryData } from "../../data/mockData";

const EnquirySearch = () => {
  const [EnquiryData, setEnquiryData] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);
  const [City, setCity] = useState([]);
  let InitialData = {
    customer: "",
    fromdate: "",
    todate: "",
    contact: "",
    city: "",
  };
  const [PayloadData, setPayloadData] = useState(InitialData);

  const handleChange = (e) => {
    let { name, value } = e.target;

    setPayloadData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    let customer = PayloadData.customer.toLowerCase();
    let city = PayloadData.city?.toLowerCase();
    let contact = PayloadData.contact;
    let fromDate = new Date(PayloadData.fromdate);
    let toDate = new Date(PayloadData.todate);

    // Debugging logs
    console.log("Customer:", customer);
    console.log("City:", city);
    console.log("Contact:", contact);
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);

    // Set fromDate to the start of the day
    fromDate.setHours(0, 0, 0, 0);

    // Set toDate to the end of the day
    toDate.setHours(23, 59, 59, 999);

    let filterData = EnquiryData.filter((enquiry) => {
      const enquiryDate = new Date(enquiry.enquiryDate);
      const match =
        customer === enquiry.customer?.toLowerCase() &&
        city === enquiry.city?.toLowerCase() &&
        contact == enquiry?.contact1 &&
        enquiryDate >= fromDate &&
        enquiryDate <= toDate;

      return match;
    });

    setFilteredData(filterData);
  };

  useEffect(() => {
    getEnquiry();
    getCity();
  }, []);
  const getEnquiry = async () => {
    try {
      const response = await getData(ApiUrl.GETENQUIRY);

      if (response.status === 200) {
        setEnquiryData(response.data);
      }
    } catch (error) {
      console.error("Error fetching enquiry data:", error);
    }
  };

  const getCity = async () => {
    try {
      const response = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/master/getcity"
      );

      if (response.status === 200) {
        setCity(response.data.mastercity);
      }
    } catch (error) {
      console.error("Error fetching enquiry data:", error);
    }
  };
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
    },
    {
      name: "EnquiryId",
      selector: (row) => row.enquiryId,
    },
    {
      name: "Customer",
      selector: (row) => row.customer,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },

    {
      name: "Excutive",
      selector: (row) => row.excutive,
    },

    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Contact",
      selector: (row) => row.contact1,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },

    {
      name: "City",
      selector: (row) => row.city,
    },

    {
      name: "Enquiry Date",
      selector: (row) => (
        <span>{moment(row.enquiryDate).format("D MMMM YYYY")}</span>
      ),
    },

    {
      name: "Service",
      selector: (row) => row.service,
    },
    {
      name: "Status",
      selector: (row) => row.Status,
    },
  ];
  return (
    <Box m="20px">
      <EnquiryTab />

      <div className="row m-auto">
        <Header subtitle="Search Enquiry" />

        <div className="row m-auto border">
          <div className="col-md-10 m-auto p-4">
            <div className="row">
              <div className="col-md-4 mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={PayloadData.customer}
                  type="text"
                  name="customer"
                  placeholder="Customer name"
                />
              </div>{" "}
              <div className="col-md-4 mb-3">
                <Form.Label>From Date</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={PayloadData.fromdate}
                  type="date"
                  name="fromdate"
                />
              </div>
              <div className="col-md-4 mb-3">
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={PayloadData.todate}
                  type="date"
                  name="todate"
                />
              </div>
              <div className="col-md-4 mb-3">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={PayloadData.contact}
                  type="text"
                  name="contact"
                  placeholder="contact"
                />
              </div>
              <div className="col-md-4 mb-3">
                <Form.Label>
                  City <span className="red">*</span>
                </Form.Label>
                <Form.Select
                  onChange={handleChange}
                  value={PayloadData.city}
                  name="city"
                >
                  <option>Select City</option>
                  {City?.map((ele) => (
                    <option>{ele.city}</option>
                  ))}
                </Form.Select>
              </div>
            </div>{" "}
            <div className="row mt-3">
              <div className="col-md-5 m-auto">
                <div className="row m-auto">
                  <button
                    className="col-md-4 m-auto p-1 save me-2"
                    onClick={handleSearch}
                  >
                    Search
                  </button>{" "}
                  <button
                    className="col-md-4 m-auto p-1 save "
                    onClick={() =>
                      setPayloadData(InitialData) && setFilteredData([])
                    }
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5 m-auto">
          <DataTable data={FilteredData} columns={columns} />
        </div>
      </div>
    </Box>
  );
};

export default EnquirySearch;
