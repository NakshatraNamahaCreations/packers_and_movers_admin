import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";

import Invoices from "./scenes/invoices";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Category from "./scenes/category";
import SubCategory from "./scenes/subcategory";
import Items from "./scenes/Item/index.js";
import Slots from "./scenes/Slots.js";
import Order from "./scenes/order/index.jsx";
import Services from "./scenes/Appservice.js/index.js";
import Enquiry from "./scenes/Enquiry/index.jsx";
import EnquiryAdd from "./scenes/Enquiry/EnquiryAdd.js";
import EnquirySearch from "./scenes/Enquiry/EnquirySearch.js";
import EnquiryToday from "./scenes/Enquiry/Etoday.jsx";
import Quote from "./scenes/Quote/index.jsx";
import Confirmed from "./scenes/Quote/Confirmed.jsx";
import QuoteDetails from "./scenes/Quote/QuoteDetails.jsx";
import EnquiryDetails from "./scenes/Enquiry/EnquiryDetails.jsx";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/items" element={<Items />} />
              <Route path="/slots" element={<Slots />} />
              <Route path="/category" element={<Category />} />
              <Route path="/subcategory" element={<SubCategory />} />
              <Route path="/order" element={<Order />} />
              <Route path="/service" element={<Services />} />
              <Route path="/enquiry" element={<Enquiry />} />
              <Route path="/enquiryadd" element={<EnquiryAdd />} />
              <Route path="/enquerysearch" element={<EnquirySearch />} />
              <Route path="/etoday" element={<EnquiryToday />} />
              <Route path="/quotelist" element={<Quote />} />
              <Route path="/confirmed" element={<Confirmed />} />
              <Route path="/quotedetails" element={<QuoteDetails />} />
              <Route path="/enuirydetails" element={<EnquiryDetails />} />

              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
