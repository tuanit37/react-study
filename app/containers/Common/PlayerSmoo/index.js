/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';
import 'videojs-playbackrate-adjuster';
import 'videojs-contrib-ads';
import 'videojs-css';
// import 'videojs-contrib-hls';
import { makeStyles } from '@material-ui/styles';
import { InView } from 'react-intersection-observer';

import { activePlayer, controllerPlayer } from './helper';
const useStyle = makeStyles(() => ({
  showCurrentTime: {
    display: 'block !important',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
  },
  showTimeDivider: {
    display: 'block !important',
    paddingLeft: '0.5em !important',
    paddingRight: '0.5em !important',
    minWidth: '1px !important',
  },
  showDuration: {
    display: 'block !important',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
  },
}));

window.hlPlyr = [];
function PlayerSmoo(props) {
  const { src, poster, autoplay, muted } = props;
  const classes = useStyle();
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  // const [playerCurrent, setPlayer] = useState();
  // const { ref, inView } = useInView({
  //   /* Optional options */
  //   threshold: 0.55,
  // });
  const [inView, setInview] = useState(false);
  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      const videoJsOptions = {
        // lookup the options in the docs for more options
        autoplay: false,
        muted,
        preload: 'metadata', // auto: tự động tải toàn bộ, metadata: chỉ tải dữ liệu meta: thời lượng, kích thước, none: không tải dữ lieuj nào của video
        controls: true,
        responsive: true,
        breakpoints: {
          tiny: 300,
          xsmall: 400,
          small: 500,
          medium: 600,
          large: 700,
          xlarge: 800,
          huge: 900,
        },
        fluid: true,
        aspectRatio: '4:3',
        autoSetup: true,
        controlBar: {
          children: [
            'playToggle',
            'currentTimeDisplay',
            'timeDivider',
            'durationDisplay',
            'progressControl',
            'playbackRateMenuButton',
            'PictureInPictureToggle',
            'fullscreenToggle',
            'volumePanel',
          ],
          volumePanel: {
            inline: false,
            volumeControl: {
              vertical: true,
            },
          },
        },
        playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
        poster,
        html5: {
          hls: {
            overrideNative: true,
            limitRenditionByPlayerDimensions: true,
            useDevicePixelRatio: true,
            // bandwidth: 16777216,
          },
          nativeAudioTracks: false,
          nativeVideoTracks: false,
          useBandwidthFromLocalStorage: true,
        },
      };
      playerRef.current = videojs(videoElement, videoJsOptions);
      // playerRef.current.inView = inView;
      console.log(inView);
    }
  }, []);

  useEffect(() => {
    if (playerRef) {
      const player = playerRef.current;
      player.css({
        controlBar: {
          // borderRadius: '20px',
          // marginBottom: '15px',
          // width: '90%',
          // marginLeft: '5%',
          fontSize: '1em',
          background: '#2a616a',
        },
        bigPlayButton: {
          // borderRadius: '10%',
          // width: '150px',
          // height: '150px',
          // lineHeight: '150px',
          // fontSize: '80px',
          // border: 'none',
          // left: '50%',
          // top: '50%',
          // transform: 'translate(-50%,-50%)',
          background: '#3F51B5',
        },
      });
      player.ready(() => {
        // show current time
        document
          .querySelector('.vjs-current-time')
          .classList.add(classes.showCurrentTime);
        // show durationDisplay
        document
          .querySelector('.vjs-duration')
          .classList.add(classes.showDuration);
        // show timeDivider
        document
          .querySelector('.vjs-time-divider')
          .classList.add(classes.showTimeDivider);
      });
      // player.on('play', () => {
      //   // console.log('play', player);
      //   player.bigPlayButton.el_.style.display = 'none';
      // });

      // player.on('pause', () => {
      //   console.log('pause', player.bigPlayButton.el_);
      //   // player.bigPlayButton.show();
      //   player.bigPlayButton.el_.style.display = 'block';
      // });

      // active quality
      // player.qualityLevels();
      player.bigPlayButton.on('click', () => {
        player.src(src);
        player.autoplay('muted');
        controllerPlayer({
          player,
          autoplay,
          src,
        });
      });
      // play video
      // if (autoplay) player.autoplay('muted');
      // player.volume(0.5);
      console.log(player.id_, inView);
    }
  }, [playerRef]);

  // useEffect(() => {
  //   if (inView) {
  //     activePlayer({
  //       player: playerRef.current,
  //       autoplay,
  //       src,
  //     });
  //   }
  // }, [inView]);
  return (
    <InView threshold={0.55} onChange={setInview} data-inView={inView}>
      <video
        muted
        ref={videoRef}
        className="video-js vjs-default-skin vjs-theme-city vjs-big-play-centered"
      />
    </InView>
  );
}
PlayerSmoo.propTypes = {
  src: PropTypes.string,
  poster: PropTypes.string,
  autoplay: PropTypes.bool,
  muted: PropTypes.bool,
};
export default PlayerSmoo;
