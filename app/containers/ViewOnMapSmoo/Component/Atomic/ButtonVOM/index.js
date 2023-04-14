import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

const ButtonVOM = withStyles(
  theme => ({
    root: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.warning.dark,
      },
      borderRadius: 99,
      textTransform: 'none',
      boxShadow: 'none',
    },
  }),
  { name: 'ButtonVOM' },
)(props => <Button variant="contained" {...props} />);
export default ButtonVOM;
