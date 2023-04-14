/**
 *
 * DemoMedia
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
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { io } from 'socket.io-client';
import makeSelectDemoMedia from './selectors';
import reducer from './reducer';
import saga from './saga';
import EditorMediaSmoo from '../Common/EditorMediaSmoo';
// import ImgCover from '../Common/EditorMediaSmoo/atom/ImgCover';
// import messages from './messages';
const socket = io('http://localhost:3001');
export function DemoMedia() {
  useInjectReducer({ key: 'demoMedia', reducer });
  useInjectSaga({ key: 'demoMedia', saga });

  // edit media
  const [isEditMedia, setEditorMedia] = useState(false);
  const [mediaEdit, setMediaEdit] = useState();
  const [file, setFile] = useState();
  // setInterval(() => {
  //   socket.emit('Client-sent-data', 'Hello world');
  // }, 100);
  useEffect(() => {
    if (isEditMedia) {
      console.log('send');
      // client gửi dữ liệu lên server
      socket.emit('Client-sent-data', 'Hello world');
    } else {
      // client nhận dữ liệu từ server
      socket.on('Server-sent-data', data => {
        console.log('data: ', data);
      });
    }
  }, [isEditMedia]);
  return (
    <div>
      <Helmet>
        <title>DemoMedia</title>
        <meta name="description" content="Description of DemoMedia" />
      </Helmet>

      {/* <HlPlayerSmoo
        path="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        autoplay
      /> */}

      {/* <PlayerSmoo options={videoJsOption2} onReady={handlePlayerReady} /> */}
      <Container maxWidth="sm">
        <div>
          <Button
            onClick={() => {
              setEditorMedia(true);
            }}
          >
            EditImage
          </Button>
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              hidden
              onChange={opts => {
                setFile(opts.target.files[0]);
                console.log(123, opts);
                setEditorMedia(true);
              }}
              onClick={() => {
                console.log('clik');
                setFile(null);
                setEditorMedia(false);
              }}
            />
          </Button>
        </div>

        <div>
          <img alt="" src={mediaEdit} />
        </div>
        {/* editor media */}
        <EditorMediaSmoo
          open={isEditMedia}
          media={
            file ||
            'https://test-media.hahalolo.com/2021/11/18/07/59/925dba9488991f295392ab601980221b-1637222392.jpeg'
          }
          onClose={() => {
            setEditorMedia(false);
            setFile(null);
          }}
          onCompleted={result => {
            console.log('result: ', result);
            setEditorMedia(false);
            setMediaEdit(result.path);
          }}
        />
      </Container>
    </div>
  );
}

DemoMedia.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  demoMedia: makeSelectDemoMedia(),
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
)(DemoMedia);
