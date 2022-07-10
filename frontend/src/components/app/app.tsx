import LogIn from "../auth/login";
import "./styles.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../auth/signup";
import { NotFound } from "../not-found/not-found";
import Main from "../main/main";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/*  Temporary */}
        <Route path="/home" element={<Main />} /> 

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
