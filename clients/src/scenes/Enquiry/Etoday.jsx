import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import EnquiryTab from "./EnquiryTab";
import CustomColumnMenu from "../customgrid";
import { ApiUrl } from "../../ApiRUL";
import { deleteData, getData } from "../../methods";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const EnquiryToday = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [EnquiryData, setEnquiryData] = useState([]);

  const columns = [
    { field: "index", headerName: "#" },
    { field: "enquiryId", headerName: "EnquiryId" },
    {
      field: "customer",
      headerName: "Customer",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "excutive",
      headerName: "Excutive",
    },
    {
      field: "category",
      headerName: "Category",
    },
    {
      field: "contact1",
      headerName: "Contact",
    },
    {
      field: "address",
      headerName: "Address",
    },
    {
      field: "city",
      headerName: "City",
    },
    {
      field: "enquiryDate",
      headerName: "Enquiry Date",
      renderCell: (params) => {
        const formattedDate = moment(params.row.enquiryDate).format(
          "D MMMM YYYY"
        );
        return formattedDate;
      },
    },
    {
      field: "service",
      headerName: "Service",
    },
    {
      field: "Status",
      headerName: "Status",
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: ({ row }) => (
        <div className="row">
          <CiEdit
            className="col-md-4 cursor edit fs-6"
            onClick={() => handleEdit(row)}
          />
          <span className="col-md-4"> |</span>{" "}
          <MdDeleteForever
            className="col-md-4 cursor delete fs-6"
            onClick={() => handleDelete(row.id)}
          />
        </div>
      ),
    },
  ];
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const response = await deleteData(ApiUrl.DELETEENQUIRY + id);
      if (response.status === 200) {
        alert(response.data.message);
        getEnquiry();
      }
    }
  };
  const navigate = useNavigate();
  const handleEdit = (row) => {
    navigate("/enquiryadd", { state: row });
  };

  const handleEnquiryView = (data) => {
    navigate("/enuirydetails", { state: data.row });
  };

  useEffect(() => {
    getEnquiry();
  }, []);
  const getEnquiry = async () => {
    try {
      const response = await getData(ApiUrl.GETENQUIRY);

      if (response.status === 200) {
        const currentDate = new Date().toDateString();

        let filterdata = response.data.filter((ele) => {
          const enquiryDate = new Date(ele.enquiryDate).toDateString();
          return enquiryDate === currentDate;
        });

        const rowsWithId = filterdata.map((enquiry, index) => ({
          ...enquiry,
          id: enquiry._id,
          index: index + 1,
        }));

        setEnquiryData(rowsWithId);
      }
    } catch (error) {
      console.error("Error fetching enquiry data:", error);
    }
  };

  return (
    <Box m="20px">
      <EnquiryTab />
      <Header title="ENQUIRY" />
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
        <DataGrid
          checkboxSelection
          onRowClick={handleEnquiryView}
          rows={EnquiryData}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default EnquiryToday;
