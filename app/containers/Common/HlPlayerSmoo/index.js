/**
 * @author tuan37
 * @date 09/06/2021
 * HlPlayerSmoo
 *
 */
import React, { useEffect, useRef } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
// import AtomChip from 'components/1-atoms/Chip';
// import _last from 'lodash/last';
// import Hls from 'hls.js';
import _get from 'lodash/get';
import Plyr from 'plyr';
// import plyrAds from 'plyr-ads';
import 'plyr/dist/plyr.css';
import PropTypes from 'prop-types';

import { isMobile } from 'react-device-detect';
import {
  activeVideoInView,
  // configHls,
  controlsFull,
  controlsLive,
  controlsSimple,
  // convertSecondstoTime,
  // gUuid,
  isInViewport,
  optionPlyr,
} from './hepler';
// import messages from './messages';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
  overPlay: {
    textAlign: 'center',
  },
  live: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    padding: '2px',
  },
  timeplay: {
    float: 'right',
    paddingLeft: '5px',
    color: 'yellow',
  },
  loading: {
    position: 'absolute',
    top: '50%',
  },
}));

function HlPlayerSmoo(props) {
  const {
    thumb,
    path,
    preview,
    autoplay,
    onViewModal,
    isModal,
    pip,
    videoId,
    live,
    vStyle,
  } = props;
  const classes = useStyles();
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const overplayRef = useRef(null);
  const currentTimeRef = useRef(null);
  let playerVideo = null;
  useEffect(() => {
    // playerVideo = null;
    const domContent = wrapperRef.current;
    if (domContent.clientWidth < 400 && !isModal) {
      optionPlyr.controls = controlsSimple;
    } else {
      optionPlyr.controls = controlsFull;
    }
    if (isModal && !live) {
      optionPlyr.controls = controlsFull;
      if (playerVideo) playerVideo.destroy();
    }
    if (live) {
      optionPlyr.controls = controlsLive;
    }

    optionPlyr.ads = {
      enabled: true,
      tagUrl:
        'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=',
      // skipButton: {
      //   enabled: true,
      //   text: 'Bỏ qua quảng cáo',
      //   delay: 10,
      // },
    };
    playerVideo = new Plyr(videoRef.current, optionPlyr);
    playerVideo.poster = thumb;

    // playerVideo

    // plyrAds.setup(playerVideo, {
    //   adTagUrl:
    //     'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=',
    //   skipButton: {
    //     enabled: true,
    //     text: 'Skip ad',
    //     delay: 10,
    //   },
    // });
    console.log(playerVideo);

    playerVideo.on('ready', event => {
      try {
        const instance = event.detail.plyr;
        instance.media.muted = 'muted';
        const elControls = instance.elements;
        const domOverplayVideo = overplayRef.current; // elControls.container.parentElement.firstChild;
        let heightVideo = domContent.clientHeight;
        if (
          isModal &&
          heightVideo < (_get(props, 'height') || _get(vStyle, 'height') || 350)
        ) {
          heightVideo = 350;
        }
        elControls.container.style.height = heightVideo
          ? `${Number(heightVideo)}px`
          : '100%';
        elControls.container.style.maxHeight = heightVideo
          ? `${Number(heightVideo)}px`
          : '100%';
        elControls.wrapper.style.position = 'unset';
        domContent.style.maxHeight = heightVideo
          ? `${Number(heightVideo)}px`
          : '100%';
        // custom style overplay video
        if (domContent.clientWidth < 400 && !isMobile) {
          if (typeof onViewModal === 'function' && domOverplayVideo) {
            domOverplayVideo.style.width = '100%';
            domOverplayVideo.style.height = '100%';
            domOverplayVideo.style.position = 'absolute';
            domOverplayVideo.style.zIndex = 1;
          }
        }
        if (
          instance.media &&
          ((isInViewport(instance.media) &&
            (domContent.clientWidth > 400 || isMobile)) ||
            isModal)
        ) {
          activeVideoInView(instance, {
            path,
            pip,
            autoplay,
            onViewModal,
            isModal,
            videoId,
          });
        }

        // action setting speed
        if (instance.elements.buttons.settings) {
          instance.elements.buttons.settings.addEventListener('click', () => {
            domOverplayVideo.style.height = '0%';
          });
        }

        // show time current play
        const domTimeCurrent = currentTimeRef.current;
        if (domTimeCurrent && live) {
          domTimeCurrent.appendChild(
            instance.elements.controls.getElementsByClassName(
              'plyr__time--current',
            )[0],
          );
          instance.elements.controls.getElementsByClassName(
            'plyr__time--duration',
          )[0].style.display = 'none';
        }

        // event overplay
        domOverplayVideo.addEventListener('mousemove', () => {
          elControls.container.classList.remove('plyr--hide-controls');
        });
        domOverplayVideo.addEventListener('mouseout', () => {
          elControls.container.classList.add('plyr--hide-controls');
        });
        // event volum
        if (elControls.volume) {
          elControls.volume.addEventListener('click', () => {
            window.videoConfig.volume = instance.volume;
            window.videoConfig.muted = instance.muted;
          });
        }

        // preview
        elControls.container.addEventListener('mouseover', () => {
          if (!instance.playing && instance.currentTime === 0) {
            instance.poster = preview;
          }
          elControls.container.classList.remove('plyr--hide-controls');
        });
        elControls.container.addEventListener('mouseleave', () => {
          if (!instance.playing) {
            instance.poster = thumb;
          }
          elControls.container.classList.add('plyr--hide-controls');
        });

        // open modal
        domOverplayVideo.addEventListener('click', e => {
          e.preventDefault();
          if (typeof onViewModal === 'function') {
            if (window.playerActive) {
              window.playerActive.plyr.pause();
            }
            // setPlayerVideo(null);
            // playerVideo = null;
            window.playerActive = null;
            onViewModal(e);
          }
        });
        // instance.play();
      } catch (error) {
        //
        console.log('error: ', error);
      }
    });
    playerVideo.on('play', () => {
      // const elControls = playerVideo.elements;
      const domOverplayVideo = overplayRef.current; // elControls.container.parentElement.firstChild;
      if (domOverplayVideo.firstChild) {
        domOverplayVideo.firstChild.style.display = 'none';
      }
      if (typeof onViewModal === 'function' && domOverplayVideo) {
        // show overplay
        domOverplayVideo.style.width = '100%';
        domOverplayVideo.style.height = '75%';
        domOverplayVideo.style.position = 'absolute';
        domOverplayVideo.style.zIndex = 1;
      } else {
        domOverplayVideo.style.height = '0px';
        domOverplayVideo.style.zIndex = 0;
      }

      // set video active
      if (
        window.playerActive &&
        window.playerActive.plyr.id !== playerVideo.id
      ) {
        window.playerActive.plyr.pause();
      }
      if (window.videoConfig) {
        playerVideo.volume = window.videoConfig.volume;
        playerVideo.muted = window.videoConfig.muted;
        if (window.videoConfig.videoId === videoId) {
          setTimeout(() => {
            if (window.playerActive) {
              playerVideo.currentTime = window.videoConfig.currentTime;
            }
          }, 200);
        }
      }
      if (
        window.playerActive &&
        window.playerActive.plyr &&
        playerVideo.id !== window.playerActive.plyr.id &&
        window.playerActive.plyr.pip
      ) {
        window.playerActive.plyr.pip = false;
      }
      window.playerActive = { plyr: playerVideo, options: { videoId, path } };
    });
    playerVideo.on('pause', () => {
      // const elControls = playerVideo.elements;
      const domOverplayVideo = overplayRef.current; // elControls.container.parentElement.firstChild;
      if (typeof onViewModal === 'function' && domOverplayVideo) {
        // hide overplay
        domOverplayVideo.style.width = '100%';
        domOverplayVideo.style.height = '0px';
        domOverplayVideo.style.position = 'absolute';
        domOverplayVideo.style.zIndex = -1;
      }
    });

    playerVideo.on('ratechange', () => {
      // const elControls = playerVideo.elements;
      const domOverplayVideo = overplayRef.current; // elControls.container.parentElement.firstChild;
      if (!isModal && domOverplayVideo) {
        domOverplayVideo.style.width = '100%';
        domOverplayVideo.style.height = '75%';
        domOverplayVideo.style.position = 'absolute';
        domOverplayVideo.style.zIndex = 1;
      } else {
        domOverplayVideo.style.height = '0px';
      }
    });
    playerVideo.on('timeupdate', () => {
      window.videoConfig.currentTime = playerVideo.currentTime;
      if (window.playerActive) {
        window.videoConfig.videoId = window.playerActive.options.videoId;
      }
    });
  }, [path]);
  // scroll
  window.addEventListener('scroll', () => {
    try {
      if (
        playerVideo &&
        playerVideo.media &&
        (playerVideo.media.clientWidth > 400 || isMobile) &&
        !isModal
      ) {
        activeVideoInView(playerVideo, {
          path,
          pip,
          autoplay,
        });
      }
    } catch (error) {
      //
    }
  });

  return (
    <div className={classes.root} ref={wrapperRef}>
      <div className={classes.overPlay} ref={overplayRef} />
      {live && (
        <div className={classes.live}>
          {/* <AtomChip
            color="secondary"
            label={
              <>
                <div>
                  <span>
                    {window.intl.formatMessage({
                      ...messages.live,
                    })}
                  </span>{' '}
                  <span className={classes.timeplay} ref={currentTimeRef} />
                </div>
              </>
            }
          /> */}
        </div>
      )}
      <video muted className={classes.video} preload="none" ref={videoRef} />
    </div>
  );
}

HlPlayerSmoo.propTypes = {
  thumb: PropTypes.string,
  preview: PropTypes.string,
  path: PropTypes.string.isRequired,
  onViewModal: PropTypes.func,
  autoplay: PropTypes.bool,
  pip: PropTypes.bool,
  isModal: PropTypes.bool,
  videoId: PropTypes.string,
  live: PropTypes.bool,
  vStyle: PropTypes.object,
};

export default HlPlayerSmoo;
