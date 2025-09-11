import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "../../pages/Login";
import "./style.css"
import { useState } from "react";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from "primereact/inputtext";
export default function Header() {
  const [menuSelected, setMenuSelected] = useState('dashboard');
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "images/dashboard.svg" },
    { key: "masters", label: "Masters", icon: "images/Masters.svg" },
    { key: "transactions", label: "Transactions", icon: "images/transaction.svg" },
    { key: "priceList", label: "Price List", icon: "images/priceList.svg" },
    { key: "reports", label: "Reports", icon: "images/reports.svg" },
  ];
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ borderRight: "1px solid #dedede", height: "100vh", width: "250px", paddingRight: 16, paddingLeft: 16 }}>
          <div className="sidebarLogo">
            <div style={{ width: "20px", marginRight: 20 }}>
              <img style={{ marginRight: '15px' }} src="images/appIcon.svg" />
            </div>
            <div style={{ width: 88 }}>
              <img src="images/Globiq.svg" />
            </div>
          </div>
          <div className="menuList">
            <ul>
              {menuItems.map((item) => (
                <li
                  key={item.key}
                  onClick={() => setMenuSelected(item.key)}
                  className={menuSelected === item.key ? "selected cursorPointer" : "cursorPointer"}
                >
                  <div>
                    <img src={item.icon} alt={item.label} />
                  </div>
                  {item.label}
                </li>
              ))}
            </ul>

            <div className="profileMenu">
              <div style={{display : "flex" , alignItems : "center"}}>
                <img src="images/dummyProfile.svg" alt={"profile"} />
                <span style={{marginLeft : 10}}>ByeWind</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "100%", height: "fit-content", borderBottom: "1px solid #dedede", padding: 20, display: "flex", alignItems: "center" }}>
          <div className="topHeader">
            <div style={{ width: 16, marginRight: 14 }}>
              <img style={{ width: "100%" }} src="images/Sidebar.svg" />
            </div>
            <div style={{ width: 16 }}>
              <img style={{ width: "100%" }} src="images/star.svg" />
            </div>
            <div className="breadcrumbs">
              <span>Dashboard</span>
              <span>/</span>
              <span>Home</span>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="searchInput">
              <IconField iconPosition="left">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText placeholder="Search" />
              </IconField>
              <div className="slashdiv">/</div>
            </div>
            <div style={{ width: 37, marginLeft: 12 }}>
              <img style={{ width: "100%" }} src="images/Bell.svg" />
            </div>
            <div style={{ width: 37, marginLeft: 12 }}>
              <img style={{ width: "100%" }} src="images/logout.svg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}