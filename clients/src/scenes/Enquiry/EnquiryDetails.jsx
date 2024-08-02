import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import EnquiryTab from "./EnquiryTab";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

const EnquiryDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const ViewData = location.state || null;
  console.log(ViewData, "ViewData");
  const initialData = {
    follDate: "Sat July 2024 3:24 PM",
    staffname: "Pankaj",
  };
  const [Enquiry, setEnquiry] = useState(initialData);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setEnquiry((prev) => ({ ...prev, [name]: value }));
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
                  defaultValue={Enquiry.staffname}
                  placeholder="Staff name"
                  className="row m-auto mb-3"
                />
              </div>{" "}
              <div className="col-md-4 m-auto">
                <Form.Label>Foll date</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={"Sat July 2024 3:24 PM"}
                  className="row m-auto mb-3"
                />
              </div>
              <div className="col-md-4 m-auto">
                <Form.Label>Response</Form.Label>
                <Form.Select className="row m-auto mb-3">
                  <option>Not Interested</option>
                  <option>Survey</option>
                  <option>Confirmed</option>
                  <option>Call Later</option>
                  <option>New</option>
                </Form.Select>
              </div>
            </div>
            <div className="row m-auto">
              <button className="save p-2 col-md-2" >Save</button>
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
                <th className="th_t p-2 text-center">Nxt Foll</th>
              </thead>
              <tbody>
                <tr>
                  {" "}
                  <td className="p-2">1</td>
                  <td className="p-2">Sat, Jul 27, 2024 3:15 PM</td>
                  <td className="p-2">Hema</td>
                  <td className="p-2">Confirmed</td>
                  <td className="p-2">2bathroom</td>
                  <td className="p-2">300</td>
                  <td className="p-2">00/00/0000</td>
                </tr>
                <tr>
                  {" "}
                  <td className="p-2">2</td>
                  <td className="p-2">Sat, Jul 27, 2024 3:15 PM</td>
                  <td className="p-2">Hema</td>
                  <td className="p-2">Confirmed</td>
                  <td className="p-2">2bathroom</td>
                  <td className="p-2">300</td>
                  <td className="p-2">00/00/0000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default EnquiryDetails;
