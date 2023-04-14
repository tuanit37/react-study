import withStyles from '@material-ui/core/styles/withStyles';
import AtomGrid from '.';

/* grid dạng lưới 5 cột */
const AtomGrid5 = withStyles(
  theme => ({
    root: {
      [theme.breakpoints.up('lg')]: {
        maxWidth: '20%',
        flexBasis: '20%',
      },
    },
  }),
  { name: 'AtomGrid5' },
)(AtomGrid);
export default AtomGrid5;
