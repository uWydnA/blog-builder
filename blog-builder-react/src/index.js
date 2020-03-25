import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import SetUp from './Setup';
import axios from 'axios'
import * as serviceWorker from './serviceWorker';
React.$axios = axios
React.$isLoading = true
ReactDOM.render(
    <SetUp />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
