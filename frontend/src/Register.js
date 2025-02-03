import React, { Component } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      confirm_password: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  emailValidation() {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!this.state.email || regex.test(this.state.email) === false) {
      return false;
    }

    return true;
  }
  register = () => {

    axios.post('http://localhost:2000/register', {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      this.props.history.push('/');
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  render() {
    return (
      <div style={{ marginTop: '200px' }}>
        <div>
          <h2 id="loginHead">Register</h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            type="email"
            autoComplete="off"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            placeholder="Email Address"
            required
            style = {{width: 400}}
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="User Name"
            required
            style = {{width: 400}}
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
            style = {{width: 400}}
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChange}
            placeholder="Confirm Password"
            required
            style = {{width: 400}}
          />
          <br /><br />
          <Button
            className="button_style"
            id="loginButton"
            variant="contained"
            //color="primary"
            size="small"
            disabled={this.state.username == '' || this.state.password == '' || this.emailValidation() == false}
            onClick={this.register}
            style = {{width: 200}}
          >
            Register
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link id="regcolor" href="/">
            Login
          </Link>
        </div>
      </div>
    );
  }
}
