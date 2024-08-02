import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import EnquiryTab from "./EnquiryTab";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiUrl } from "../../ApiRUL";
import { getData, postData } from "../../methods";

const EnquiryDetails = () => {
  const location = useLocation();
  const ViewData = location.state || null;

  let InitialData = {
    desc: "",
    amount: "",
    response: "",
  };
  const [PayloadData, setPayloadData] = useState(InitialData);
  const [Fallowup, setFallowup] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const handleChange = (e) => {
    let { name, value } = e.target;
    setPayloadData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getFallowup();
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const handleAddData = async () => {
    try {
      const response = await postData(ApiUrl.ADDFALLOWUP, {
        enquiryId: ViewData._id,
        enquiryDate: currentDate,
        desc: PayloadData.desc,
        amount: PayloadData.amount,
        response: PayloadData.response,
      });

      if (response.status === 200) {
        alert(response.data.message);
        setPayloadData(InitialData);
        window.location.reload("");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const getFallowup = async () => {
    try {
      const response = await getData(ApiUrl.GETFALLOWUP);

      if (response.status === 200) {
        setFallowup(response.data);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  return (
    <Box m="20px">
      <EnquiryTab />
      <div className="row">
        <div className="col-md-5">
          <Header subtitle="ENQUIRY DETAILS" />

          <div className="row">
            <table className="col-md-11">
              <thead className="text-center">
                <th className="p-2 main_h" colSpan={2}>
                  Enquiry Details
                </th>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">
                    {" "}
                    <strong>Enquiry ID</strong>
                  </td>{" "}
                  <td className="p-2"> {ViewData?.enquiryId || 0} </td>
                </tr>
                <tr>
                  <td className="p-2">
                    {" "}
                    <strong>Category</strong>
                  </td>{" "}
                  <td className="p-2"> {ViewData?.category} </td>
                </tr>

                <tr>
                  <td className="p-2">
                    {" "}
                    <strong>Customer</strong>
                  </td>{" "}
                  <td className="p-2"> {ViewData?.customer} </td>
                </tr>

                <tr>
                  <td className="p-2">
                    {" "}
                    <strong>Contact1</strong>
                  </td>{" "}
                  <td className="p-2"> {ViewData?.contact1} </td>
                </tr>

                <tr>
                  <td className="p-2">
                    {" "}
                    <strong>Contact2</strong>
                  </td>{" "}
                  <td className="p-2"> {ViewData?.contact2} </td>
                </tr>
                <tr>
                  <td className="p-2">
                    {" "}
                    <strong>Email</strong>
                  </td>{" "}
                  <td className="p-2"> {ViewData?.email} </td>
                </tr>

                <tr>
                  <td className="p-2">
                    {" "}
                    <strong>City</strong>
                  </td>{" "}
                  <td className="p-2"> {ViewData?.city} </td>
                </tr>

                <tr>
                  <td className="p-2">
                    {" "}
                    <strong>Address</strong>
                  </td>{" "}
                  <td className="p-2"> {ViewData?.address} </td>
                </tr>
                <tr>
                  <td className="p-2">
                    {" "}
                    <strong>Executive </strong>
                  </td>{" "}
                  <td className="p-2"> {ViewData?.excutive} </td>
                </tr>
                <tr>
                  <td className="p-2">
                    {" "}
                    <strong>Enquiry Date</strong>
                  </td>{" "}
                  <td className="p-2">
                    {" "}
                    {moment(ViewData?.enquiryDate).format("DD MMM YY")}
                  </td>
                </tr>
                <tr>
                  <td className="p-2">
                    {" "}
                    <strong>Service </strong>
                  </td>{" "}
                  <td className="p-2"> {ViewData?.service} </td>
                </tr>
                <tr>
                  <td className="p-2">
                    {" "}
                    <strong>Reference</strong>
                  </td>{" "}
                  <td className="p-2"> {ViewData?.reference} </td>
                </tr>
                <tr>
                  <td className="p-2">
                    {" "}
                    <strong>Status</strong>
                  </td>{" "}
                  <td className="p-2"> {ViewData?.Status} </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-7">
          <Header subtitle="Follow-Up Detail" />

          <Card className="row p-2">
            <div className="row">
              <div className="col-md-4 m-auto">
                <Form.Label>Staff name</Form.Label>
                <Form.Control
                  value={ViewData.excutive}
                  placeholder="Excutive name"
                  className="row m-auto mb-3"
                />
              </div>{" "}
              <div className="col-md-4 ">
                <Form.Label>Foll date</Form.Label>
                <Form.Control
                  value={currentDate?.toLocaleDateString()}
                  className="row m-auto mb-3"
                />
              </div>
              <div className="col-md-4 ">
                <Form.Label>Response</Form.Label>
                <Form.Select
                  onChange={handleChange}
                  value={PayloadData.response}
                  name="response"
                  className="row m-auto mb-3"
                >
                  <option>Select Response</option>
                  <option value="Not Interested">Not Interested</option>
                  <option value="Confirmed">Confirmed</option>
                </Form.Select>
              </div>
              <div className="col-md-4 ">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={PayloadData.desc}
                  name="desc"
                  className="row m-auto mb-3"
                />
              </div>
              {PayloadData.response === "Confirmed" && (
                <div className="col-md-4 ">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    name="amount"
                    value={PayloadData.amount}
                    className="row m-auto mb-3"
                  />
                </div>
              )}
            </div>
            <div className="row m-auto">
              <button className="save p-2 col-md-2" onClick={handleAddData}>
                Save
              </button>
            </div>
          </Card>
          <div className="row mt-4">
            <table>
              <thead>
                <th className="th_t p-2 text-center">SI No.</th>
                <th className="th_t p-2 text-center">Date</th>
                <th className="th_t p-2 text-center">Staff</th>
                <th className="th_t p-2 text-center">Response</th>
                <th className="th_t p-2 text-center">Description</th>
                <th className="th_t p-2 text-center">Value</th>
              </thead>
              <tbody>
                {Fallowup?.map((ele, index) => {
                  const formattedDate = moment(ele.enquiryDate).format(
                    "ddd, MMM D, YYYY h:mm A"
                  );
                  return (
                    <tr>
                      {" "}
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{formattedDate}</td>
                      <td className="p-2">{ViewData?.excutive}</td>
                      <td className="p-2">{ele.response}</td>
                      <td className="p-2">{ele.desc}</td>
                      <td className="p-2">{ele.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default EnquiryDetails;
