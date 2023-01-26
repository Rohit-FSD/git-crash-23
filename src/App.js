import React from "react";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import User from "./components/users/User";
import NotFound from "./components/pages/NotFound";
import { Alert } from "./components/layout/Alert";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

import "./App.css";

const App = () => {
     return (
          <GithubState>
               <AlertState>
                    <Router>
                         <div className="App">
                              <Navbar />
                              <div className="container">
                                   <Alert />
                                   <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/about" element={<About />} />
                                        <Route path={`/user/:login`} element={<User />} />
                                        <Route path="*" element={<NotFound />} />
                                   </Routes>
                              </div>
                         </div>
                    </Router>
               </AlertState>
          </GithubState>
     );
};

export default App;
