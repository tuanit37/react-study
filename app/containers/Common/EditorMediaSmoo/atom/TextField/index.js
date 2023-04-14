import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

const AtomTextField = withStyles(
  theme => ({
    root: {
      '& .MuiInputLabel-asterisk': {
        color: theme.palette.error.main,
      },
      // border nhạt
      '& [class*="MuiInput-underline"]:before': {
        borderBottomColor: theme.palette.grey[300],
      },
      '& [class*="MuiOutlinedInput-root"]': {
        '& fieldset': {
          borderColor: theme.palette.grey[300],
        },
      },
    },
  }),
  {
    name: 'AtomTextField',
  },
)(TextField);
export default AtomTextField;
