import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import Croppie from 'croppie';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import { cropImage, gUuid } from '../helper';
// import 'croppie/croppie.css';
const useStyles = makeStyles(theme => ({
  imgCover: {
    position: 'relative',
    height: 0,
    overflow: 'hidden',
    backgroundColor: props => props.backgroundColor || undefined,
  },
  imgCoverHover: {
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      zIndex: 1,
      backgroundColor: theme.palette.common.black,
      transition: `${theme.transitions.duration.standard}ms`,
      opacity: 0,
    },
    '&:hover': {
      '&:before': { opacity: theme.palette.action.focusOpacity },
    },
  },
  blurImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#342c2c', // theme.palette.common.white,
    '& img': {
      '-webkit-filter': 'blur(2px)',
      filter: 'blur(2px)',
      transform: 'scale(1)',
      opacity: 0.15,
    },
  },
  ratio11: {
    paddingTop: '100%',
  },
  ratio34: {
    paddingTop: 'calc(100% * 4 / 3)',
  },
  ratio43: {
    paddingTop: 'calc(100% * 3 / 4)',
  },
  ratio124: {
    paddingTop: 'calc(100% * 4 / 12)',
  },
  ratio169: {
    paddingTop: 'calc(100% * 9 / 16)',
  },
  img: {
    width: '100%',
    height: '100%',
    '-o-object-fit': 'cover',
    objectFit: 'cover',
    '-o-object-position': 'center',
    objectPosition: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  video: {
    objectFit: 'contain',
    backgroundColor: theme.palette.common.black,
  },
  viewFitMedia: {
    objectFit: 'scale-down',
  },
  title: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 2,
    padding: theme.spacing(2),
    color: theme.palette.common.white,
    fontWeight: 600,
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.3) 0, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0) 100%)`,
    textShadow: `0px 1px 2px ${theme.palette.common.black}`,
  },
  canvas: {
    display: 'none',
  },
}));
export const imgCoverRatioClasses = {
  11: 'ratio11',
  34: 'ratio34',
  43: 'ratio43',
  124: 'ratio124', // ảnh header cover
  169: 'ratio169',
};

function EditImage(props) {
  const {
    media,
    ratio,
    alt,
    onProgress,
    onResult,
    imgProps,
    mediaDom,
    crop,
    rotate,
  } = props;
  const classes = useStyles();
  const [path, setPath] = useState();
  const refDom = useRef(mediaDom);
  const refDomDev = useRef(null);

  useEffect(() => {
    if (media) {
      let imgSrc = '';
      if (typeof media === 'string') {
        imgSrc = media;
      } else {
        imgSrc = window.URL.createObjectURL(media);
      }
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', imgSrc, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = ev => {
          if (ev.lengthComputable) {
            let progress = (ev.loaded / ev.total) * 100;
            progress = progress === 100 ? 99 : progress;
            // setProgress(progress);
            const objProgress = {
              progress: Number(progress.toFixed(0)),
              media,
            };
            if (typeof onProgress === 'function') {
              onProgress(objProgress);
            }
          } else {
            // setProgress(0);
            const objProgress = {
              progress: 0,
              media,
              error: 'Load media error',
            };
            if (typeof onProgress === 'function') {
              onProgress(objProgress);
            }
          }
        };
        xhr.onloadend = () => {
          if (!xhr.status.toString().match(/^2/)) {
            // setProgress(0);
            const objProgress = {
              progress: 0,
              media,
              error: 'Load media error',
            };
            if (typeof onProgress === 'function') {
              onProgress(objProgress);
            }
          } else {
            setPath(imgSrc);
            setTimeout(() => {
              // setProgress(100);
              const objProgress = {
                progress: 100,
                media,
              };
              if (typeof onProgress === 'function') {
                onProgress(objProgress);
              }
            }, 500);
          }
        };
        xhr.send();
      } catch (e) {
        //
      }
    }
  }, [media]);

  useEffect(() => {
    if (path) {
      refDom.current.src = path;
      if (window.haloCroppie) window.haloCroppie.replace(path);
    }
  }, [path]);

  // crop image
  useEffect(() => {
    if (crop) {
      if (path && refDom && refDom.current) {
        cropImage({
          ref: refDom.current,
          onCompleted: result => {
            if (onResult) onResult(result);
          },
        });
      }
    } else {
      cropImage({
        destroy: !crop,
      });
    }
  }, [crop]);

  // rotate image
  useEffect(() => {
    if (rotate && path) {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      const myCanvas = document.getElementById('canvasImageHalo');
      img.onload = () => {
        const ctx = myCanvas.getContext('2d');
        let widthImage = img.width;
        let heightImage = img.height;
        if (widthImage > heightImage) {
          heightImage = widthImage;
          widthImage = heightImage;
        }
        if (widthImage < heightImage) {
          widthImage = heightImage;
          heightImage = widthImage;
        }
        // Assign width and height.
        myCanvas.width = img.width;
        myCanvas.height = img.height;

        ctx.translate(myCanvas.width / 2, myCanvas.height / 2);

        // Rotate the image and draw it on the canvas.
        // (I am not showing the canvas on the webpage.
        ctx.rotate((90 * Math.PI) / 180);
        if (img.width > img.height) {
          ctx.drawImage(img, -img.width / 2, -img.height / 2);
        } else {
          ctx.drawImage(img, -img.height / 2, -img.width / 2);
        }

        // ctx.rotate(-Math.PI / 2);
        // ctx.translate(-myCanvas.width / 2, -myCanvas.height / 2);

        myCanvas.toBlob(blob => {
          const fileNew = new File([blob], `${gUuid()}${Date.now()}nnkv.jpg`, {
            lastModified: Date.now(),
            type: 'image/jpeg',
          });
          const pathRotate = window.URL.createObjectURL(fileNew);
          setPath(pathRotate);
          // return rotate
          onResult({
            file: fileNew,
            path: pathRotate,
          });
        });
      };
      img.src = path;
      console.log('path: ', path);
    }
  }, [rotate]);
  return (
    <React.Fragment>
      <div
        {...imgProps}
        className={clsx(
          classes.imgCover,
          ratio ? classes[imgCoverRatioClasses[ratio]] : undefined,
          imgProps && imgProps.className ? imgProps.className : undefined,
        )}
        ref={refDomDev}
      >
        {/* <img alt="" ref={refDom} id="image" /> */}
        <div className={classes.blurImage}>
          <img className={classes.img} alt="" src={path} />
        </div>
        <div className={classes.img}>
          <img
            ref={refDom}
            className={clsx(classes.img, classes.viewFitMedia)}
            alt={alt}
            // src={path || 'defaultThumbImage'}
            {...imgProps}
          />
        </div>
      </div>
      <canvas id="canvasImageHalo" className={classes.canvas} />
    </React.Fragment>
  );
}
EditImage.defaultProps = {
  ratio: '169',
  media: 'defaultThumbImage',
  alt: '',
};
EditImage.propTypes = {
  media: PropTypes.any,
  mediaDom: PropTypes.any,
  onProgress: PropTypes.func,
  onCropCompleted: PropTypes.func,
  imgProps: PropTypes.object,
  crop: PropTypes.bool,
  rotate: PropTypes.bool,
  ratio: PropTypes.string,
  alt: PropTypes.string,
  viewFitMedia: PropTypes.bool,
  onResult: PropTypes.func,
};
export default EditImage;
