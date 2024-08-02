import React, { useState } from "react";
import Login from "./components/Login";
import DataProvider from "./components/DataProvider";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Create from "./components/Create";
import Display from "./components/Display";
import Singnup from "./components/Singnup";
import Signup from "./components/Singnup";

const App = () => {
  const [authenticate, setAuthenticate] = useState(false);

  return(
    <div>

                   <DataProvider >
      <BrowserRouter>
        <Routes>
      

          <Route path="/Login" element={<Login setAuthenticate={setAuthenticate} />}/>

          
          <Route path="/Signup" element={<Signup setAuthenticate={setAuthenticate} />}/>

      
          <Route path="/" element={ authenticate ? (
                  <>
                    <Header />
                    <Outlet />
                  </>
                ) : (
                    <Navigate replace to="/Login" />

              )
            }
          >
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/create" element={<Create></Create>}></Route>
 
            <Route path="/display/:id" element={<Display></Display>}></Route>
            
                             <Route path="/Signup" element={<Singnup></Singnup>}></Route>
    
          </Route>

        </Routes>
      </BrowserRouter>
                   </DataProvider>
    </div>
  

  );
  };



export default App;
