import logo from './logo.svg';
import './App.css';
import Datatable from'./component/Datatble';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from './component/AddCustomer';
function App() {
  return (
   <BrowserRouter>
   <Routes>
      <Route path="/addcustomer" element={<AddUser/>}/>
      <Route path="/" element={<Datatable/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
