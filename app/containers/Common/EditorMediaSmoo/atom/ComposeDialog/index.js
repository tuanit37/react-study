import Dialog from '@material-ui/core/Dialog';
import withStyles from '@material-ui/core/styles/withStyles';

const ComposeDialog = withStyles(
  theme => ({
    paper: {
      [theme.breakpoints.up('sm')]: {
        overflow: 'hidden',
      },
    },
    paperWidthSm: {
      maxWidth: 500,
    },
  }),
  { name: 'ComposeDialog' },
)(Dialog);

export default ComposeDialog;
