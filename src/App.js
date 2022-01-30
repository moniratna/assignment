import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import Header from './components/Header.js';
import Content from './Pages/Content';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        {/* <Route exact path="/" element={<Home />}> */}
          <Route path="/content" element={<Content />} />
          <Route path="/" element={<Home />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
