import { Routes, Route } from "react-router-dom";
import Login from "./Pages/login";
import Dashboard from "./Pages/dashboard";
import PageDetails from "./Pages/pageDetails";
import PrivateRoute from "./Component/PrivateRoute";

function App() {
  const tokens = localStorage.getItem("access_token");

  return (
    <div className="App">
      <Routes>
        <Route exact path="*" element={!tokens ? <Login /> : <Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/pages" exact element={<Dashboard />}>
            <Route path="*" element={<Dashboard />} />
          </Route>
          <Route path="/pages/:id" element={<PageDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
