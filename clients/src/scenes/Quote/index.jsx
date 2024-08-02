import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import CustomColumnMenu from "../customgrid";

const Quote = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "#" },
    {
      field: "category",
      headerName: "Category",
      width: 200,
    },
    {
      field: "QID",
      headerName: "QID",
    },
    {
      field: "QDate",
      headerName: "Q Dt-Tm",
    },

    {
      field: "name",
      headerName: "Name",
    },

    {
      field: "contact",
      headerName: "Contact",
    },

    {
      field: "address",
      headerName: "Address",
      width: 250,
    },

    {
      field: "city",
      headerName: "City",
    },

    {
      field: "service",
      headerName: "Service",
    },

    {
      field: "amount",
      headerName: "QAmt",
    },

    {
      field: "Executive",
      headerName: "Executive",
    },

    {
      field: "lastFDate",
      headerName: "Last F/W Dt",
    },

    {
      field: "NextFDate",
      headerName: "Next F/W Dt",
    },
    {
      field: "desc",
      headerName: "Desc",
    },
  ];
  const navigate = useNavigate();
  const handleQuoteDetails = (data) => {
    navigate("/quotedetails", { state: data.row });
  };

  return (
    <Box m="20px">
      <Header title="QUOTE" />
      <div className="row">
        <div className="enquir-tab">
          <a href="/quotelist" className="enquiry-btn p-1 me-3">
            Quotelist
          </a>

          <a href="/confirmed" className="enquiry-btn p-1 me-3">
            Confirmed
          </a>
        </div>
      </div>
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
          onRowClick={handleQuoteDetails}
          rows={mockDataInvoices}
          columns={columns}  components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Quote;
