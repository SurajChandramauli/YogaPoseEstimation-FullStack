import "../pages/assets/style.css";
//import "../pages/assets/pickPose.css";

import React, { Component } from "react";

import {
  Button,
} from "@material-ui/core";

const axios = require("axios");

var getUserName = localStorage.getItem("userName");
var myGreeting = "Welcome! " + getUserName;

export default class Dashboard extends Component {
  logOut = () => {
    localStorage.setItem("token", null);
    localStorage.clear();
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
 
        <div>
          <h4  style={{marginTop:"5px", marginBottom:"5px"}}>{myGreeting}</h4>
        </div>
        <div>
          <div class="top-container" style={{marginTop:"5px"}}>
            <h1  style={{marginTop:"10px", marginBottom:"5px"}}>YOGA POSE ESTIMATION</h1>
            {/* <h2>Build by students of Computer Scinece & Engineering</h2> */}
            <h3 id="subHeading"  style={{marginTop:"5px"}}>This project estimates and tell accuracy of the yoga posture being perfromed by an individual.</h3>
            <h5>Dveloped with ❤️ by Chandramauli</h5>
 
          </div>
          <div class="options-container" style={{ float: "center", marginTop:"0px"}}>
            <div className="a-wrapper">
              <img
                src="imgs/yoga-titlepage.jpeg"
                className="yoga-title"
                alt="yoga-title-page"
              />
            </div>
            <div style={{ float: "centre", alignItems: "center" }}>
              <a
                href="https://surajchandramauli.github.io/YogaPoseEstimationWebsite/pickPose.html"
                // href="/pickPose"
                className="buttonss"
              >
                Choose Pose
              </a>
              <a
                href="/aboutUs"
                // href="/aboutUs"
                className="buttonss"
              >
                About us
              </a>
            </div>
          </div>
        </div>
        <Button
          className="button_style"
          variant="contained"
          size="large"
          style={{ float: "center", color: "#b03231", marginTop:"20px", marginBottom:"10px"}}
          onClick={this.logOut}
        >
          Log Out
        </Button>
        <footer style={styles.footer}>
        <p style={styles.footerText}> &copy; Copyright 2023. &copy;Suraj Chandramauli</p>
        <p style={styles.footerText}> Dveloped with ❤️ by Chandramauli</p>
      </footer>
      </div>
    );
  }
}

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    position: "center",
    bottom: "0",
    width: "100%",
    boxSizing: "border-box",
  },
  footerText: {
    fontSize: "1.2em",
    margin: 0,
    position: "center",
    textAlign:"center"
  }
}
