import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/add" element={<AddContact />} />

          <Route exact path="/edit/:id" element={<EditContact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
