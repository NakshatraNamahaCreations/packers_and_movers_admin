import { Box } from "@mui/material";

import Header from "../../components/Header";

import { Card, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const QuoteDetails = () => {
  const location = useLocation();
  let data = location.state || null;

  const [IsQuote, setIsQuote] = useState(false);
  return (
    <Box m="20px">
      <Header title="QUOTE" />
      <div className="row">
        <div className="enquir-tab">
          <a href="/orderlist" className="enquiry-btn p-1 me-3">
            Quotelist
          </a>

          <a href="/confirmed" className="enquiry-btn p-1 me-3">
            Confirmed
          </a>
        </div>
      </div>
      <div className="row mt-5 m-auto">
        {!IsQuote ? (
          <Card className="p-4">
            <h4>Billing Details</h4>
            <hr />
            <div className="row">
              <div className="col-md-4">
                <p className="m-auto">
                  <span className="main_h me-2">Enquiry Id :</span>
                  <span className="sub_h">{data?.QID}</span>
                </p>
                <p className="m-auto">
                  <span className="main_h me-2">Email :</span>
                  <span className="sub_h">{data?.email}</span>
                </p>
              </div>
              <div className="col-md-4">
                <p className="m-auto">
                  <span className="main_h me-2">Mobile No :</span>
                  <span className="sub_h">{data?.contact}</span>
                </p>
                <p className="m-auto">
                  <span className="main_h me-2">Address :</span>
                  <span className="sub_h">{data?.address}</span>
                </p>
              </div>
              <div className="col-md-4">
                <p className="m-auto">
                  <span className="main_h me-2">Customer Name :</span>
                  <span className="sub_h">{data?.name}</span>
                </p>
              </div>
            </div>
            <div className="row">
              <button className="col-md-2 p-1 save mt-2 mb-2">
                Edit details
              </button>
            </div>
            <span className="main_h">Service Details</span>
            <hr />
            <div className="row">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Form.Label>
                    Select Category <span className="red">*</span>
                  </Form.Label>
                  <Form.Select type="text" name="Name"></Form.Select>
                </div>
                <div className="col-md-6 mb-3">
                  <Form.Label>
                    {" "}
                    Select Sevice <span className="red">*</span>
                  </Form.Label>
                  <Form.Select type="text" name="Name"></Form.Select>
                </div>
                <div className="col-md-6 mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="text" name="Name" />
                </div>
                <div className="col-md-6 mb-3">
                  <Form.Label>
                    Rate <span className="red">*</span>
                  </Form.Label>
                  <Form.Control type="text" name="email" />
                </div>
                <div className="col-md-12 mb-3">
                  <Form.Label>
                    Note <span className="red">*</span>
                  </Form.Label>
                  <Form.Control as="textarea" name="Name" />
                </div>
              </div>{" "}
              <div className="row mt-3">
                <div className="col-md-5 m-auto">
                  <div className="row m-auto">
                    <button className="col-md-4 m-auto p-1 save me-2">
                      Add Service
                    </button>{" "}
                    <button className="col-md-4 m-auto p-1 save ">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <table>
                <thead className="text-center th_t">
                  <th className="p-2">SI No.</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Region</th>
                  <th className="p-2">Subcategory</th>
                  <th className="p-2">Job</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Action</th>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td className="p-2">1</td>
                    <td className="p-2">Living Room</td>
                    <td className="p-2">Within City</td>
                    <td className="p-2">Plastic Chairs</td>
                    <td className="p-2">job</td>
                    <td className="p-2">1</td>
                    <td className="p-2">1500</td>
                    <td className="p-2">Delete</td>
                  </tr>
                  <tr className="text-center">
                    <td className="p-2" colSpan={6}></td>
                    <td className="p-2">1500</td>
                    <td className="p-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row mt-3">
              <div className="col-md-5 m-auto">
                <div className="row m-auto">
                  <button className="col-md-4 m-auto p-1 save me-2">
                    Save Quote
                  </button>{" "}
                  <button
                    className="col-md-4 m-auto p-1 save "
                    onClick={() => setIsQuote(true)}
                  >
                    Print Quote
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <div className="row shadow-sm bg-white mb-5 p-4">
            <div className="row p-4">
              <div className="col-md-3 me-auto">
                <div className="row text-center">
                  <img
                    src="../assets/logo192.png"
                    className="col-md-6 m-auto"
                  />
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="row">
                  <p className="col-md-3">Quotation#</p>
                  <input value={1} className="input-tag col-md-3 mb-3" />
                </div>
                <div className="row">
                  <p className="col-md-3">Date</p>
                  <input className="input-tag col-md-7 mb-3" type="date" />
                </div>
              </div>
            </div>

            <div className="row p-4">
              <div className="col-md-6  me-auto">
                <div className="row">
                  <p className="main_h">From</p>
                </div>

                <div className="row">
                  <span className="sub_h m-auto">vijayahome service</span>{" "}
                </div>
                <div className="row">
                  <span className=" m-auto">9902995376</span>
                </div>
                <div className="row">
                  <p className="m-auto">vijayahomeservice@gmail.com</p>
                </div>
                <div className="row ">
                  <p className="m-auto">Website</p>
                  <a
                    className="m-auto text-decoration-none text-dark"
                    href="https://www.vijayhomeservices.com/Bangalore"
                  >
                    https://www.vijayhomeservices.com
                  </a>
                </div>
              </div>
              <div className="col-md-6  me-auto">
                <div className="row">
                  <p className="main_h">Bill To</p>
                </div>
                <p className="row sub_h m-auto">{data?.name}</p>
                <p className="row  m-auto">{data?.contact}</p>
                <p className="row  m-auto">{data?.email}</p>{" "}
                <p className="row m-auto">{data?.address}</p>{" "}
              </div>
            </div>
            <div className="row">
              <table>
                <thead className="text-center">
                  <th className="p-2">Category</th>
                  <th className="p-2">Scop of job</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Rate</th>
                  <th className="p-2">Amount</th>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td className="p-2">1</td>
                    <td className="p-2">Living Room</td>
                    <td className="p-2">Within City</td>
                    <td className="p-2">1</td>
                    <td className="p-2">1500</td>
                  </tr>
                  <tr className="text-center">
                    <td className="p-2">2</td>
                    <td className="p-2">Bed Room</td>
                    <td className="p-2">Within City</td>
                    <td className="p-2">3</td>
                    <td className="p-2">2000</td>
                  </tr>
                  <tr className="text-center">
                    <td className="p-2" colSpan={3}></td>
                    <td>Total Amount</td>
                    <td className="p-2">1500</td>
                  </tr>
                  <tr className="text-center">
                    <td className="p-2" colSpan={3}></td>
                    <td>Paid Amount</td>
                    <td className="p-2">
                      <input className="input-tag" type="number" value={0} />
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td className="p-2" colSpan={3}></td>
                    <td>Balance Due</td>
                    <td className="p-2">1500</td>
                  </tr>
                </tbody>
              </table>
              <div className="row mt-4">
                <div className="col-md-4 me-auto ">
                  <p className="main_h"> BANK DETAILS</p>
                  <p className="m-auto">
                    {" "}
                    <span className="main_h">Account Name :</span>{" "}
                    <span className="sub_hh"> VIJAY HOME SERVICES</span>
                  </p>
                  <p className="m-auto">
                    {" "}
                    <span className="main_h"> Account Number :</span>{" "}
                    <span className="sub_hh">9446228221</span>
                  </p>
                  <p className="m-auto">
                    {" "}
                    <span className="main_h"> IFSC :</span>{" "}
                    <span className="sub_hh">KKBK0008066</span>
                  </p>
                  <p className="m-auto">
                    {" "}
                    <span className="main_h"> BANK NAME :</span>{" "}
                    <span className="sub_hh">KOTAK BANK</span>
                  </p>
                  <p className="m-auto">
                    {" "}
                    <span className="main_h">Branch Name :</span>{" "}
                    <span className="sub_hh">M.G.ROAD</span>
                  </p>
                  <p className="m-auto">
                    {" "}
                    <span className="main_h">
                      Gpay / Phonepe Details Mobile No. :
                    </span>{" "}
                    <span className="sub_hh">8073077921</span>
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="row ">
                    {" "}
                    <span className="col-md-10 me-auto main_h">
                      GST(5%) :
                    </span>{" "}
                    <span className="col-md-2 sub_hh"> 0</span>
                  </p>
                  <p className="row ">
                    {" "}
                    <span className="col-md-10 me-auto main_h">
                      Total :
                    </span>{" "}
                    <span className="col-md-2 sub_hh"> 2000</span>
                  </p>
                  <p className="m-auto">
                    {" "}
                    <span className="main_h">In Words :</span>{" "}
                    <span className="sub_hh">Two Thousand only</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Box>
  );
};

export default QuoteDetails;
