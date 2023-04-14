import withStyles from '@material-ui/core/styles/withStyles';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const AtomListItemIconSmall = withStyles(
  theme => ({
    root: {
      minWidth: theme.spacing(5),
    },
  }),
  { name: 'AtomListItemIconSmall' },
)(ListItemIcon);
export default AtomListItemIconSmall;
