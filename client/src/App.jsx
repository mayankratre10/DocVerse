import { BrowserRouter, Routes, Route } from "react-router-dom";
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
