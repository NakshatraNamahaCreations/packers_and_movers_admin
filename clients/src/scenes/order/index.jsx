import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { CiEdit } from "react-icons/ci";
import { GrFormViewHide } from "react-icons/gr";
import Multiselect from "multiselect-react-dropdown";
import CustomColumnMenu from "../customgrid";
import { ApiUrl } from "../../ApiRUL";
import { getData, postData, putData } from "../../methods";

const localizer = momentLocalizer(moment);
const transformEvents = (data) => {
  const eventMap = data.reduce((acc, item) => {
    const date = moment(item.fromDate, "MM/DD/YYYY").format("YYYY-MM-DD");
    if (!acc[date]) {
      acc[date] = { date, count: 0 };
    }
    acc[date].count += 1;
    return acc;
  }, {});

  return Object.values(eventMap).map((event) => ({
    title: `${event.count} orders`,
    start: moment(event.date).toDate(),
    end: moment(event.date).toDate(),
    allDay: true,
  }));
};

const Order = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [filterData, setFilterData] = useState([]);
  const [calendarView, setCalendarView] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [ViewData, setViewData] = useState(null);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [OrderData, setOrderData] = useState([]);
  const columns = [
    { field: "OrderId", headerName: "Order Id" },
    {
      field: "customer",
      headerName: "Customer name",

      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone No.",
    },
    {
      field: "pickupLocation",
      headerName: "Pickup Location",
      width: 200,
    },
    {
      field: "dropLocation",
      headerName: "Drop Location",
      width: 200,
    },
    {
      field: "locationType",
      headerName: "LocationType",
    },
    {
      field: "slot",
      headerName: "Slot",

      renderCell: (params) => (
        <div>
          <span key={params.row.slot._id}>
            {params.row.slot.startTime} - {params.row.slot.endTime}
          </span>
        </div>
      ),
    },

    {
      field: "vendor",
      headerName: "Vendor",
      renderCell: (params) => (
        <div key={params.row.vendor.id}>
          {params?.row.vendor?.map((Ele) => (
            <span className="vendor me-2">{Ele?.name}, </span>
          ))}
        </div>
      ),
    },
    {
      field: "Excutive",
      headerName: "Excutive",
    },
    {
      field: "bookingAmount",
      headerName: "Amount",

      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ₹{params.row.bookingAmount}
        </Typography>
      ),
    },
    {
      field: "fromDate",
      headerName: "From Date",
    },
    {
      field: "toDate",
      headerName: "To Date",
    },
    {
      headerName: "Action",

      renderCell: ({ row }) => (
        <div color={colors.grey[100]} sx={{ ml: "5px" }}>
          <CiEdit
            className="cursor edit me-2 fs-6"
            onClick={() => handleEdit(row)}
          />
          |{" "}
          <GrFormViewHide
            className="cursor delete fs-6"
            onClick={() => Viewmore(row)}
          />
        </div>
      ),
    },
  ];
  useEffect(() => {
    getORder();
  }, []);

  const getORder = async () => {
    try {
      const response = await getData(ApiUrl.GETORDER);

      if (response.status === 200) {
        setOrderData(response.data);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  const options = [
    { name: "hema", id: 1 },
    { name: "arushi", id: 2 },
    { name: "shreya", id: 3 },
    { name: "swati", id: 4 },
    { name: "priya", id: 5 },
    { name: "rani", id: 6 },
    { name: "ankashi", id: 7 },
  ];

  const handleEdit = () => {};

  const Viewmore = (data) => {
    setViewMore(true);
    setViewData(data);
  };

  const handleSelect = (event) => {
    const selectedDate = moment(event.start).format("YYYY-MM-DD");

    const filteredData = OrderData.filter((order) => {
      const orderDate = moment(order.fromDate, "MM/DD/YYYY").format(
        "YYYY-MM-DD"
      );
      return orderDate === selectedDate;
    });

    const rowsWithId = filteredData.map((item, index) => ({
      ...item,
      id: item._id,
      index: index + 1,
    }));

    setCalendarView(true);
    setFilterData(rowsWithId);
  };

  const onSelect = (selectedList, selectedItem) => {
    setSelectedVendors(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedVendors(selectedList);
  };
  useEffect(() => {
    if (ViewData?.vendor) {
      const defaultVendors = ViewData?.vendor?.map((vendor) => {
        const foundVendor = options?.find((opt) => opt.id === vendor.id);
        return foundVendor || vendor;
      });
      setSelectedVendors(defaultVendors);
    }
  }, [ViewData?.vendor]);

  // const AddOrder = async () => {
  //   try {
  //     const response = await postData(ApiUrl.ADDORDER, {
  //       OrderId: Math.floor(100000 + Math.random() * 900000).toString(),
  //       customer: "soham",
  //       locationType: "Outside City",
  //       category: "Bed Room",
  //       email: "arya76@gmail.com",
  //       phone: 9902995376,
  //       fromDate: "8/012/2024",
  //       toDate: "8/08/2024",
  //       pickupLocation:
  //         "W95W+Q7V, Tavarekere, Dodda Aladmara Road, Uttarahalli Hobli, Bengaluru, Karnataka 562130",
  //       dropLocation:
  //         "W95W+Q7V, Tavarekere, Dodda Aladmara Road, Uttarahalli Hobli, Bengaluru, Karnataka 562130",

  //       Excutive: "Pankaj",
  //       Services: {
  //         id: 3,
  //         offerPrice: 34,
  //         realPrice: 50,
  //         desc: "test",
  //         planName: "2bhk skitchen shifting",
  //       },
  //       referenceCode: "043",
  //       amount: 3500,
  //       bookingAmount: 4500,
  //       slot: {
  //         id: 2,
  //         endTime: "8AM",
  //         startTime: "10AM",
  //       },
  //     });

  //     if (response.status === 200) {
  //       alert(response.data.message);
  //       // setAddCategory(false);
  //       window.location.reload("");
  //     }
  //   } catch (error) {
  //     console.error("Error adding user:", error);
  //   }
  // };

  const updateORder = async () => {
    try {
      const response = await putData(ApiUrl.UPDATORDER + ViewData._id, {
        vendor: selectedVendors,
      });
      if (response.status === 200) {
        alert(response.data.message);
        window.location.reload("");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="ORDER" subtitle="List of Orders" />
      {/* <button className="col-md-2" onClick={AddOrder}>
        Add Order
      </button> */}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {calendarView ? (
          !viewMore ? (
            <DataGrid
              checkboxSelection
              rows={filterData}
              columns={columns}
              components={{
                ColumnMenu: CustomColumnMenu,
              }}
            />
          ) : (
            <div className="container mt-4">
              <div className="row">
                {/* Order Details */}
                <div className="col-md-8 mb-3 order-details">
                  <div className="card shadow-sm">
                    <table>
                      <thead className="text-center">
                        <th className="p-2 main_h" colSpan={2}>
                          Order Details
                        </th>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2">
                            {" "}
                            <strong>Order Id</strong>
                          </td>{" "}
                          <td className="p-2"> {ViewData.OrderId || 0} </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            {" "}
                            <strong>Customer name</strong>
                          </td>{" "}
                          <td className="p-2"> {ViewData.customer} </td>
                        </tr>

                        <tr>
                          <td className="p-2">
                            {" "}
                            <strong>Contact</strong>
                          </td>{" "}
                          <td className="p-2"> {ViewData.phone} </td>
                        </tr>

                        <tr>
                          <td className="p-2">
                            {" "}
                            <strong>Email</strong>
                          </td>{" "}
                          <td className="p-2"> {ViewData.email} </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            {" "}
                            <strong>Pickup Location</strong>
                          </td>{" "}
                          <td className="p-2"> {ViewData.pickupLocation} </td>
                        </tr>

                        <tr>
                          <td className="p-2">
                            {" "}
                            <strong>Drop Location</strong>
                          </td>{" "}
                          <td className="p-2"> {ViewData.dropLocation} </td>
                        </tr>

                        <tr>
                          <td className="p-2">
                            {" "}
                            <strong>Reference Code</strong>
                          </td>{" "}
                          <td className="p-2"> {ViewData.referenceCode} </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            {" "}
                            <strong>Location Type </strong>
                          </td>{" "}
                          <td className="p-2"> {ViewData.locationType} </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            {" "}
                            <strong>Service Start Date</strong>
                          </td>{" "}
                          <td className="p-2"> {ViewData.fromDate} </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            {" "}
                            <strong>Service End Date</strong>
                          </td>{" "}
                          <td className="p-2"> {ViewData.toDate} </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            {" "}
                            <strong>Total Amount</strong>
                          </td>{" "}
                          <td className="p-2"> {ViewData.bookingAmount} </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            {" "}
                            <strong>Excutive</strong>
                          </td>{" "}
                          <td className="p-2"> {ViewData.Excutive} </td>
                        </tr>

                        <tr>
                          <td className="p-2">
                            {" "}
                            <strong>Vendor</strong>
                          </td>{" "}
                          <td className="p-2">
                            {" "}
                            {ViewData?.vendor.vendorname}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            {" "}
                            <strong>Scheduled Slot</strong>
                          </td>{" "}
                          <td className="p-2">
                            {" "}
                            {ViewData?.slot.startTime} -{" "}
                            {ViewData?.slot.endTime}{" "}
                          </td>
                        </tr>

                        <tr>
                          <td className="p-2">
                            {" "}
                            <strong>Booked Services</strong>
                          </td>{" "}
                          <td className="p-2">
                            {" "}
                            <span className=" me-2">
                              {ViewData?.Services.planName}
                            </span>
                            <span className="offer-price price">
                              ₹{ViewData?.Services.offerPrice}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="p-2">
                            {" "}
                            <strong>Description</strong>
                          </td>{" "}
                          <td className="p-2"> {ViewData?.Services.desc}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Assign Job To Vendors */}
                <div className="col-md-4 mb-3 assign-vendors">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">Assign Job To Vendors</h5>
                      <Multiselect
                        options={options}
                        selectedValues={selectedVendors}
                        onSelect={onSelect}
                        onRemove={onRemove}
                        displayValue="name"
                        placeholder="Select Vendor"
                      />
                      <button
                        className="save p-2 mt-3 w-100"
                        onClick={updateORder}
                      >
                        Update Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <Calendar
            localizer={localizer}
            events={transformEvents(OrderData)}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={handleSelect}
          />
        )}
      </Box>
    </Box>
  );
};

export default Order;
