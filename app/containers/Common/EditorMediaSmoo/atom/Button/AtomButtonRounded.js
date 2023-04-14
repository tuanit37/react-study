import withStyles from '@material-ui/core/styles/withStyles';
import AtomButton from '.';
import { normalizeButton, roundedButton } from './buttonStyles';

const AtomButtonRounded = withStyles(
  () => ({
    root: {
      ...roundedButton,
      ...normalizeButton,
      // padding: theme.spacing(1, 2.25),
      // paddingLeft: theme.spacing(3),
      // paddingRight: theme.spacing(3),
    },
  }),
  { name: 'AtomButtonRounded' },
)(AtomButton);
export default AtomButtonRounded;
