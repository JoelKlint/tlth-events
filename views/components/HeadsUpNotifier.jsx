import React, { Component, PropTypes } from 'react';
import Alert from 'react-s-alert';
import AlertTemplate from './AlertTemplate.jsx'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

const HeadsUpNotifier = (props) => {
  return (
    <Alert
      stack={true}
      effect='jelly'
      timeout={4000}
      contentTemplate={AlertTemplate}
    />
  )
}

export default HeadsUpNotifier
