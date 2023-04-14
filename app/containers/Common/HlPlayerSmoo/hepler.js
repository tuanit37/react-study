import _last from 'lodash/last';
import _find from 'lodash/find';
import _min from 'lodash/min';
import Hls from 'hls.js';
import _get from 'lodash/get';

export const gUuid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

// config option plyr
export const optionPlyr = {
  enabled: true,
  // config Plyr
  controls: [],
  settings: [
    // 'captions',
    'quality',
    'speed',
    // 'loop',
  ],
  autoplay: false,
  autopause: true,
  seekTime: 10, // Thời gian, tính bằng giây, để tìm kiếm khi người dùng nhấn nhanh hoặc tua lại.
  volume: 1,
  muted: true,
  disableContextMenu: false, // Vô hiệu hóa menu chuột phải trên video để giúp che giấu rất thô sơ để ngăn tải nội dung.
  hideControls: true, // an control 2s neu ko tac dong
  loop: { active: true },
  clickToPlay: true,
  captions: {
    active: true,
    language: 'auto',
    update: true,
  },
  speed: {
    selected: 1,
    options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  },
  quality: {
    default: 720,
    options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
  },
  // ratio: '1:1',
};
// controls player
export const controlsFull = [
  'play-large', // The large play button in the center
  'play', // Play/pause playback
  'restart', // Restart playback
  'progress', // The progress bar and scrubber for playback and buffering
  'current-time', // The current time of playback
  'duration', // The full duration of the media
  'mute', // Toggle mute
  'volume', // Volume control
  'captions', // Toggle captions
  'settings', // Settings menu
  'pip', // Picture-in-picture (currently Safari only)
  'airplay', // Airplay (currently Safari only)
  'fullscreen', // Toggle fullscreen
];
export const controlsSimple = [
  'play-large', // The large play button in the center
  'play', // Play/pause playback
  // 'restart', // Restart playback
  // 'progress', // The progress bar and scrubber for playback and buffering
  // 'current-time', // The current time of playback
  // 'duration', // The full duration of the media
  'mute', // Toggle mute
  'volume', // Volume control
  // 'captions', // Toggle captions
  // 'settings', // Settings menu
  // 'pip', // Picture-in-picture (currently Safari only)
  'airplay', // Airplay (currently Safari only)
  // 'fullscreen', // Toggle fullscreen
];

export const controlsLive = [
  'play-large', // The large play button in the center
  'play', // Play/pause playback
  // 'restart', // Restart playback
  // 'progress', // The progress bar and scrubber for playback and buffering
  'current-time', // The current time of playback
  'duration', // The full duration of the media
  'mute', // Toggle mute
  'volume', // Volume control
  'captions', // Toggle captions
  'settings', // Settings menu
  'pip', // Picture-in-picture (currently Safari only)
  'airplay', // Airplay (currently Safari only)
  'fullscreen', // Toggle fullscreen
];

// config hls
export const configHls = {
  autoStartLoad: true, // used by stream-controller
  startPosition: -1, // used by stream-controller
  debug: false, // used by logger
  capLevelOnFPSDrop: true, // used by fps-controller
  capLevelToPlayerSize: true, // used by cap-level-controller
  initialLiveManifestSize: 3, // used by stream-controller

  maxBufferLength: 3, // used by stream-controller
  maxMaxBufferLength: 6, // used by stream-controller
  maxBufferSize: 60 * 1024 * 1024, // used by stream-controller
  maxBufferHole: 0.25, // used by stream-controller

  lowBufferWatchdogPeriod: 0.5, // used by stream-controller
  highBufferWatchdogPeriod: 3, // used by stream-controller
  nudgeOffset: 1, // used by stream-controller
  nudgeMaxRetry: 3, // used by stream-controller
  maxFragLookUpTolerance: 0.25, // used by stream-controller
  liveSyncDurationCount: 3, // used by stream-controller
  liveMaxLatencyDurationCount: Infinity, // used by stream-controller
  // liveSyncDuration: void 0, // used by stream-controller
  // liveMaxLatencyDuration: void 0, // used by stream-controller
  // liveDurationInfinity: true, // used by buffer-controller
  // liveBackBufferLength: 900, // used by buffer-controller
  enableWorker: false, // used by demuxer
  // enableSoftwareAES: true, // used by decrypter
  // manifestLoadingTimeOut: 10000, // used by playlist-loader
  // manifestLoadingMaxRetry: 1, // used by playlist-loader
  // manifestLoadingRetryDelay: 1000, // used by playlist-loader
  // manifestLoadingMaxRetryTimeout: 60, // used by playlist-loader
  startLevel: 0, // used by level-controller
  // levelLoadingTimeOut: 10000, // used by playlist-loader
  // levelLoadingMaxRetry: 4, // used by playlist-loader
  // levelLoadingRetryDelay: 1000, // used by playlist-loader
  // levelLoadingMaxRetryTimeout: 64000, // used by playlist-loader
  // fragLoadingTimeOut: 20000, // used by fragment-loader
  // fragLoadingMaxRetry: 6, // used by fragment-loader
  // fragLoadingRetryDelay: 10000, // used by fragment-loader
  // fragLoadingMaxRetryTimeout: 64000, // used by fragment-loader
  // startFragPrefetch: true, // used by stream-controller
  // fpsDroppedMonitoringPeriod: 5000, // used by fps-controller
  // fpsDroppedMonitoringThreshold: 0.2, // used by fps-controller
  // appendErrorMaxRetry: 3, // used by buffer-controller
  // stretchShortVideoTrack: true, // used by mp4-remuxer
  // maxAudioFramesDrift: 1, // used by mp4-remuxer
  // forceKeyFrameOnDiscontinuity: true, // used by ts-demuxer
  // abrEwmaFastLive: 3, // used by abr-controller
  // abrEwmaSlowLive: 9, // used by abr-controller
  // abrEwmaFastVoD: 3, // used by abr-controller
  // abrEwmaSlowVoD: 9, // used by abr-controller
  // abrEwmaDefaultEstimate: 5e5, // 500 kbps  // used by abr-controller
  // abrBandWidthFactor: 0.95, // used by abr-controller
  // abrBandWidthUpFactor: 0.7, // used by abr-controller
  // abrMaxWithRealBitrate: true, // used by abr-controller
  // maxStarvationDelay: 4, // used by abr-controller
  // maxLoadingDelay: 4, // used by abr-controller
  // minAutoBitrate: 0, // used by hls
  // emeEnabled: true, // used by eme-controller
  // widevineLicenseUrl: void 0, // used by eme-controller
  // drmSystemOptions: {}, // used by eme-controller
  // testBandwidth: true,
};
export function isInViewport(el) {
  let elm = el;
  let top = elm.offsetTop;
  let left = elm.offsetLeft;
  const width = elm.offsetWidth;
  const height = elm.offsetHeight;

  while (elm.offsetParent) {
    elm = elm.offsetParent;
    top += elm.offsetTop;
    left += elm.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    top + height <= window.pageYOffset + window.innerHeight &&
    left + width <= window.pageXOffset + window.innerWidth
  );
}
window.players = [];
window.playerActive = null;
window.videoConfig = {
  volume: 0,
  muted: false,
};
export function activeVideoInView(plyr, options) {
  try {
    localStorage.removeItem('cache-sprite-plyr');
    // console.log(
    //   'pictureInPictureElement: ',
    //   document.pictureInPictureElement,
    //   window.playerActive,
    // );
    if (
      window.playerActive &&
      window.playerActive.plyr &&
      window.playerActive.plyr.pip
    ) {
      console.log('video play pip');
    } else {
      const pOld = _find(window.players, item => item.plyr.id === plyr.id);
      if (!pOld) {
        window.players.push({ plyr, options });
      }
      // get video in viewport
      window.players = window.players.filter(item => {
        const vIv = isInViewport(item.plyr.media);
        if (!vIv) {
          item.plyr.pause();
        }
        if (
          window.playerActive &&
          item.plyr.id !== window.playerActive.plyr.id
        ) {
          item.plyr.pause();
        }
        return vIv;
      });
      // TH nhiều video trong viewport thì lấy video đầu tiên
      if (
        !window.playerActive ||
        (window.playerActive &&
          !isInViewport(window.window.playerActive.plyr.media))
      ) {
        window.playerActive = _min(window.players, item => {
          const viewInst = item.plyr.media.getBoundingClientRect();
          return !item.plyr.playing && viewInst.top + viewInst.left;
        });
      }
      if (options.isModal) {
        window.playerActive = {
          plyr,
          options,
        };
      }
      if (
        window.playerActive &&
        window.playerActive.plyr &&
        !window.playerActive.plyr.playing &&
        window.playerActive.options.path &&
        (window.playerActive.options.autoplay ||
          window.playerActive.options.isModal)
      ) {
        const { path } = window.playerActive.options;
        const extPath = _last(path.split('.'));
        if (extPath !== 'm3u8') {
          window.playerActive.plyr.media.src = path;
          window.playerActive.plyr.play();
        } else if (Hls.isSupported()) {
          const hls = new Hls(configHls);
          if (
            hls &&
            !hls.media &&
            window.playerActive &&
            window.playerActive.plyr
          )
            hls.attachMedia(window.playerActive.plyr.media);
          hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            if (window.playerActive.options.path) {
              hls.loadSource(window.playerActive.options.path);
              hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (hls.url && window.playerActive) {
                  window.playerActive.plyr.play();
                }
              });
            }
          });
          hls.on(Hls.Events.ERROR, (evt, data) => {
            console.log('errror: ', data, data.fatal, data.type);
            if (data.fatal) {
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  console.log('load net error');
                  hls.startLoad();
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  console.log('error MEDIA_ERROR: ', hls);
                  if (hls) hls.recoverMediaError();
                  if (window.playerActive.plyr) {
                    window.playerActive.plyr.media.pause();
                  }
                  hls.destroy();
                  break;
                case Hls.ErrorTypes.OTHER_ERROR:
                  console.log('OTHER_ERROR, try to recover');
                  hls.recoverMediaError();
                  if (window.playerActive.plyr) {
                    window.playerActive.plyr.media.pause();
                  }
                  hls.destroy();
                  break;
                default:
                  // cannot recover
                  hls.stopLoad();
                  if (window.playerActive.plyr) {
                    window.playerActive.plyr.media.pause();
                  }
                  hls.destroy();
                  break;
              }
            } else if (hls) {
              if (_get(hls, '_media')) {
                hls.destroy();
              }
              window.playerActive.plyr.pause();
            }
          });
        }
        if (window.videoConfig) {
          window.playerActive.plyr.volume = window.videoConfig.volume;
          window.playerActive.plyr.muted = window.videoConfig.muted;
          if (
            window.videoConfig.videoId === window.playerActive.options.videoId
          ) {
            setTimeout(() => {
              if (window.playerActive) {
                window.playerActive.plyr.currentTime =
                  window.videoConfig.currentTime;
              }
            }, 200);
          }
        }
      }
    }
    // check video in view
  } catch (error) {
    console.log(error);
  }
}

export function convertSecondstoTime(timePlay) {
  let totalSeconds = timePlay;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);

  // If you want strings with leading zeroes:
  minutes = String(minutes).padStart(2, '0');
  hours = String(hours).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  const timecur = `${hours}:${minutes}:${seconds}`;
  return timecur;
}
