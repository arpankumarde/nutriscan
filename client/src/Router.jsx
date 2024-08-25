import { Routes, Route } from "react-router-dom";
import { Home, Scanner, NotFound, Login, Signup } from "./pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scan" element={<Scanner />} />
      <Route path="/chat" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
