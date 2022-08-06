import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Todo from "../pages/Todo";
import NotFound from "../pages/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/todo" element={<Todo/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};

export default Router;
