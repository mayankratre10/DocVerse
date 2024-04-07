import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/DocVerse" element = {<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
