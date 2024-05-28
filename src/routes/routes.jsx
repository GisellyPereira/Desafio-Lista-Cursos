import { BrowserRouter, Routes, Route} from "react-router-dom";
import Courses from "../components/Courses/Courses";

function Router() {
 

    return (
      <BrowserRouter>
        <Routes>
            <Route  path="/" element={<Courses />} />
        </Routes>
      </BrowserRouter>
    )
  }
  
  export default Router;
  