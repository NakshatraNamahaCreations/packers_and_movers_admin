import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import CustomColumnMenu from "../customgrid";

const Quote = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "QID",
      selector: (row) => row.QID,
    },

    {
      name: "Q Dt-Tm",
      selector: (row) => row.QDate,
    },

    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
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
      name: "Service",
      selector: (row) => row.service,
    },
    {
      name: "QAmt",
      selector: (row) => row.amount,
    },
    {
      name: "Executive",
      selector: (row) => row.Executive,
    },
    {
      name: "Last F/W Dt",
      selector: (row) => row.lastFDate,
    },
    {
      name: "Next F/W Dt",
      selector: (row) => row.NextFDate,
    },
    {
      name: "Desc",
      selector: (row) => row.desc,
    },
  ];
  const navigate = useNavigate();
  const handleQuoteDetails = (data) => {
    console.log(data, "data");
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
      <div className="row m-auto">
        <DataTable
          onRowClick={handleQuoteDetails}
          data={mockDataInvoices}
          columns={columns} components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </div>
    </Box>
  );
};

export default Quote;
