import {Route, Routes} from "react-router-dom";
import Todo from "../pages/Todo";
import NotFound from "../pages/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Todo/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};

export default Router;
