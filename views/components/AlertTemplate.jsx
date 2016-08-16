import React, { Component, PropTypes } from 'react';
import Alert from 'react-s-alert';
import assign from 'lodash/fp/assign'

const AlertTemplate = (props) => {

  const handleClick = () => {
    Alert.close(props.id);
  }

  return (
    <div
      onClick={() => handleClick()}
      className={props.classNames}
      id={props.id}
      style={assign(props.styles, {cursor: 'pointer'})}
    >
      <div
        className='s-alert-box-inner'
        style={{textAlign: 'center' }}
      >
        <b>{props.message}</b>
        <br/>
        {props.customFields.subText}
      </div>
    </div>
  )
}

export default AlertTemplate
