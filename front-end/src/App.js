import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.js";
import Footer from "./components/Footer.js";
import SignUp from "./components/SignUp.js";
import PrivateComponent from "./components/PrivateComponent.js";
import Login from "./components/Login.js";
import AddProduct from "./components/AddProduct.js";
import ProductsList from "./components/ProductsList.js";
import UpdateProduct from "./components/UpdateProduct.js";
import Profile from "./components/Profile.js";
import { AppProvider } from "./components/AppContext.js";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/" element={<ProductsList />} />
              <Route
                path="/add"
                element={
                  <h1>
                    <AddProduct />
                  </h1>
                }
              />
              <Route
                path="/update/:id"
                element={
                  <h1>
                    <UpdateProduct />
                  </h1>
                }
              />
              <Route path="/logout" element={<h1>Logout Component</h1>} />
              <Route
                path="/profile"
                element={
                  <h1>
                    <Profile />
                  </h1>
                }
              />
              \
            </Route>

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>

        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
