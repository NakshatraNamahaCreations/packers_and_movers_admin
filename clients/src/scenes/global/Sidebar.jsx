import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import AppsOutageOutlinedIcon from "@mui/icons-material/AppsOutageOutlined";
import EventNoteIcon from "@mui/icons-material/EventNote";
import QuizIcon from "@mui/icons-material/Quiz";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#478CCF !important",
        },
        "& .pro-menu-item.active": {
          color: "#478CCF !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  <img
                    width="20px"
                    height="20px"
                    src="./../assets/logo192.png"
                  />
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src="./../assets/user.png"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Hema
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Packers & Movers
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <SubMenu title="Item Management" icon={<GridViewIcon />}>
              <Item
                title="Category"
                to="/category"
                icon={<CategoryOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Subcategory"
                to="/subcategory"
                icon={<AppsOutageOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Item"
                to="/items"
                icon={<InventoryOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu
              title="Service Management"
              icon={<CreditCardOutlinedIcon />}
            >
              <Item
                title="Slots"
                to="/slots"
                icon={<EventNoteIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Service"
                to="/service"
                icon={<ManageAccountsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu title="Report Management" icon={<SignalCellularAltIcon />}>
              <Item
                title="Order"
                to="/order"
                icon={<LocalMallOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Enquiry"
                to="/enquiry"
                icon={<QuizIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Quote"
                to="/quotelist"
                icon={<ReceiptLongIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Invoices Balances"
                to="/invoices"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
