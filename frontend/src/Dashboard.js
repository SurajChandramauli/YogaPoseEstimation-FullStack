import React, { Component } from 'react';



import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import swal from 'sweetalert';
const axios = require('axios');

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      loading: false
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    } else {
      this.setState({ token: token }, () => {
      });
    }
  }

  logOut = () => {
    localStorage.setItem('token', null);
    this.props.history.push('/');
  }


  render() {
    return (
      <div>
        {this.state.loading && <LinearProgress size={40} />}
        <div>
          <h2>Yoga</h2>
          <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </Button>
        </div>
      </div>
    );
  }
}