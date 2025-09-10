// AppContent.js
import { useState, useEffect } from "react";
import NavRouting from "../../component/NavRouting";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../assest/css/style.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function AppContent() {
  const [showModal, setShowModal] = useState(true);

  return <NavRouting />;
}

export default AppContent;
