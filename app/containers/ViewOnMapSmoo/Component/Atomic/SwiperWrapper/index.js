import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import React from 'react';
import 'swiper/swiper-bundle.min.css';

const useStyles = makeStyles(theme => ({
  swiperWrapper: {
    '& .swiper-container': {
      //   overflow: 'unset',
    },
    '& .swiper-button-prev, .swiper-button-next': {
      width: theme.spacing(6),
      height: theme.spacing(6),
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      borderRadius: '50%',
      boxShadow: theme.shadows[1],
      transition: '.3s',
      '&:hover': {
        backgroundColor:
          theme.palette.type === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[700],
      },
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    '& .swiper-button-prev': {
      left: theme.spacing(0),
    },
    '& .swiper-button-next': {
      right: theme.spacing(0),
    },
    '& .swiper-button-next:after, .swiper-button-prev:after': {
      fontSize: theme.spacing(1.5),
    },
    '& .swiper-button-disabled': {
      pointerEvents: 'auto',
    },
  },
}));

/* wrapper Swiper to override styles */
export default function SwiperWrapper({ children }) {
  const classes = useStyles();
  return <div className={classes.swiperWrapper}>{children}</div>;
}
SwiperWrapper.propTypes = {
  children: PropTypes.node,
};
