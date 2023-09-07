import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import { Box } from "@mui/material";
function RootLayOut() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <NavBar />
        </nav>
      </header>
      <ToastContainer />
      <Box height={10} />
      <main>
        <Outlet />
      </main>
      <Box height={20} />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default RootLayOut;
