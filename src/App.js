import React, { Component, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import About from "./components/pages/About";
import User from "./components/users/User";
import { Alert } from "./components/layout/Alert";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";

class App extends Component {
     state = {
          users: [],
          user: {},
          loading: false,
          alert: null,
          repos: [],
     };

     async componentDidMount() {
          this.setState({ loading: true });
          const response = await axios.get(
               `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
          );
          this.setState({ users: response.data, loading: false });
     }

     searchUsers = async (text) => {
          this.setState({ loading: true });
          const response = await axios.get(
               `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
          );
          this.setState({ users: response.data.items, loading: false });
     };

     getUser = async (username) => {
          this.setState({ loading: true });
          const response = await axios.get(
               `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
          );
          this.setState({ user: response.data, loading: false });
     };

     getUserRepos = async (username) => {
          this.setState({ loading: true });
          const response = await axios.get(
               `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
          );
          this.setState({ repos: response.data, loading: false });
     };

     clearUsers = () => this.setState({ users: [], loading: false });

     setAlert = (msg, type) => {
          this.setState({ alert: { msg: msg, type: type } });
          setTimeout(() => this.setState({ alert: null }), 5000);
     };

     render() {
          const { users, user, loading, repos } = this.state;
          return (
               <Router>
                    <div className="App">
                         <Navbar />
                         <div className="container">
                              <Alert alert={this.state.alert} />
                              <Routes>
                                   <Route
                                        path="/"
                                        element={
                                             <Fragment>
                                                  <Search
                                                       searchUsers={this.searchUsers}
                                                       clearUsers={this.clearUsers}
                                                       showClear={users.length > 0 ? true : false}
                                                       setAlert={this.setAlert}
                                                  />
                                                  <Users loading={loading} users={users} />
                                             </Fragment>
                                        }
                                   />
                                   <Route path="/about" element={<About />} />
                                   <Route
                                        path={`/user/:login`}
                                        element={
                                             <User
                                                  getUser={this.getUser}
                                                  getUserRepos={this.getUserRepos}
                                                  user={user}
                                                  repos={repos}
                                                  loading={loading}
                                             />
                                        }
                                   />
                              </Routes>
                         </div>
                    </div>
               </Router>
          );
     }
}

export default App;
