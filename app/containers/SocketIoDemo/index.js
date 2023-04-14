/**
 *
 * SocketIoDemo
 *
 */

import React, { memo, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Button, TextField } from '@material-ui/core';
import { io } from 'socket.io-client';
import makeSelectSocketIoDemo from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

const socket = io('http://localhost:3001');

export function SocketIoDemo() {
  useInjectReducer({ key: 'socketIoDemo', reducer });
  useInjectSaga({ key: 'socketIoDemo', saga });

  const [textMessage, setMessage] = useState('');

  const [dataMsg, setDataMsg] = useState([]);
  const onSubmit = () => {
    // client gửi dữ liệu lên server
    const data1 = [...dataMsg].concat([`${socket.id}: ${textMessage}`]);
    setDataMsg(data1);
    socket.emit('send msg', textMessage);
  };

  useEffect(() => {
    if (textMessage) {
      socket.on('send msg', data => {
        const data2 = [...dataMsg].concat([data]);
        setDataMsg(data2);
      });
    }
  }, [textMessage]);

  return (
    <div>
      <Helmet>
        <title>SocketIoDemo</title>
        <meta name="description" content="Description of SocketIoDemo" />
      </Helmet>

      <React.Fragment>
        <TextField
          onChange={event => {
            setMessage(event.target.value);
          }}
          onKeyDown={event => {
            if (event.which === 13) onSubmit();
          }}
        />{' '}
        <Button color="primary">Sumbmit</Button>
        <div>
          {dataMsg.map((msg, idx) => (
            <div key={String(idx)}>
              <span>{msg}</span>
            </div>
          ))}
        </div>
      </React.Fragment>
    </div>
  );
}

SocketIoDemo.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  socketIoDemo: makeSelectSocketIoDemo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SocketIoDemo);
