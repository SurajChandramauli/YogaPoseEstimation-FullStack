
import "../pages/assets/style.css";
import "../pages/assets/pickPose.css";

import React, { Component } from 'react';

import swal from 'sweetalert';
const axios = require('axios');

export default class PickPose extends Component {
  logOut = () => {
    localStorage.setItem('token', null);
    this.props.history.push('/');
  }
  render() {
    return (
        <div>
        <div>
          <h1>Instructions</h1>
          <h2>Begin a yoga session by picking from one of the poses below.</h2>
        </div>
      
        <div className="row-poses">
          <div className="column-poses">
            <a href="/practice" className="mountain-img" id="Mountain">
                <div className="a-wrapper"><img src="imgs/mountain.svg" /></div>
                </a>
            <p className='pose-description'>Mountain Pose</p>
          </div>
          <div className="column-poses">
            <a href="/practice" className="tree-img" id="Tree"><img src="imgs/tree.png" /></a>
            <p className='pose-description'>Tree Pose</p>
          </div>
          <div className="column-poses">
            <a href="/practice" className="goddess-img" id="Goddess"><img src="imgs/goddess.png"/></a>
            <p className='pose-description'>Goddess Pose</p>
          </div>
          <div className="column-poses">
            <a href="/practice" className="warrior2-img" id="Warrior-2"><img src="imgs/warrior2.png" /></a>
            <p className='pose-description'>Warrior 2 Pose</p>  
          </div>
          <div className="column-poses">
            <a href="/practice" className="triangle-img" id="Triangle"><img  src="imgs/triangle.png" /></a>
            <p className='pose-description'>Triangle Pose</p>  
          </div>
          <div className="column-poses">
            <a href="/practice" className="reverse-warrior-img" id="Reverse-Warrior"><img  src="imgs/reverse-warrior.png" /></a>
            <p className='pose-description'>Reverse Warrior Pose</p>  
          </div>
          <div className="column-poses">
            <a href="/practice" className="seated-twist-img" id="Seated-Twist"><img  src="imgs/seated-twist.png" /></a>
            <p className='pose-description'>Seated Twist Pose</p>  
          </div>
          <div className="column-poses">
            <a href="/practice" className="side-plank-img" id="Side-Plank"><img  src="imgs/side-plank.png" /></a>
            <p className='pose-description'>Side Plank Pose</p>  
          </div>
        </div>
      
        <div className="buttons">
          <div><a href="index.html" className="button">Back</a></div>
        </div>
      
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="index.js" charset="utf-8"></script>
      
      </div>
    );
  }
}



