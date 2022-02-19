import React, {useEffect} from "react";
import API from "./shared/API";
import LoginData from "./shared/LoginData";
import { useCookies } from 'react-cookie';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Table from "./table/Table";
import Login from "./login/Login";
import Signup from "./signup/Signup";

function App() {
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        if (cookies.autorizedData == undefined)
            setCookie("autorizedData", new LoginData(null, null));
        console.log(cookies.autorizedData);
    })

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Table/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;
