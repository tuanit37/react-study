import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import AtomTypography from '../Typography';

const defaultThumbImage = '';

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
    backgroundColor: theme.palette.common.black,
    '& img': {
      '-webkit-filter': 'blur(2px)',
      filter: 'blur(2px)',
      transform: 'scale(10)',
      opacity: 0.3,
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
}));

/* các tỉ lệ ảnh */
export const imgCoverRatioClasses = {
  11: 'ratio11',
  34: 'ratio34',
  43: 'ratio43',
  124: 'ratio124', // ảnh header cover
  169: 'ratio169',
};

/* ảnh cover sử dụng image bên trong */
export default function ImgCover(props) {
  const {
    imgCoverProps,
    imgProps,
    src,
    alt,
    children,
    title,
    titleProps,
    ratio,
    viewAsVideo,
    viewFitMedia,
    backgroundColor,
    blurImage,
  } = props;

  const classes = useStyles({ backgroundColor });

  return (
    <div
      {...imgCoverProps}
      className={clsx(
        classes.imgCover,
        ratio ? classes[imgCoverRatioClasses[ratio]] : undefined,
        title ? classes.imgCoverHover : undefined,
        imgCoverProps && imgCoverProps.className
          ? imgCoverProps.className
          : undefined,
      )}
    >
      {blurImage && (
        <div className={classes.blurImage}>
          <img className={classes.img} alt={alt} src={blurImage} />
        </div>
      )}

      {viewAsVideo ? (
        <video
          className={clsx(
            classes.img,
            viewAsVideo ? classes.video : undefined,
            viewFitMedia ? classes.viewFitMedia : undefined,
          )}
          alt={alt}
          src={src}
          {...imgProps}
        >
          <track kind="captions" />
        </video>
      ) : (
        <img
          className={clsx(
            classes.img,
            viewAsVideo ? classes.video : undefined,
            viewFitMedia ? classes.viewFitMedia : undefined,
          )}
          alt={alt}
          src={src || defaultThumbImage}
          {...imgProps}
        />
      )}

      {title && (
        <AtomTypography className={classes.title} {...titleProps}>
          {title}
        </AtomTypography>
      )}
      {children}
    </div>
  );
}

ImgCover.propTypes = {
  imgCoverProps: PropTypes.object, // customize thẻ chứa
  imgProps: PropTypes.object, // customize image (width, height gắn theo size ảnh, không ảnh hưởng gì đến style)
  src: PropTypes.string, // đường dẫn media
  alt: PropTypes.string, // text thay thế khi ko có ảnh
  children: PropTypes.node, // content thêm
  title: PropTypes.node, // tiêu đề ảnh
  titleProps: PropTypes.object, // customize title props
  ratio: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.oneOf(Object.keys(imgCoverRatioClasses)),
  ]), // tỉ lệ ảnh (11, 43, 124, 169), mặc định 169
  viewAsVideo: PropTypes.bool, // hiển thị thẻ video thay vì thẻ img
  viewFitMedia: PropTypes.bool, // hiển thị vừa vặn media trong khung hình mà không crop mất như cover
  backgroundColor: PropTypes.string, // chọn màu nền tùy chỉnh
  blurImage: PropTypes.string, // ảnh mờ phía sau ảnh bìa
};
ImgCover.defaultProps = {
  ratio: '169',
  src: defaultThumbImage,
  alt: 'Cover img',
};
