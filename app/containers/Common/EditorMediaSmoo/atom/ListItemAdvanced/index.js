import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import AtomListItem from '../ListItem';
import AtomListItemAvatar from '../ListItemAvatar';
import AtomListItemIconSmall from '../ListItemIcon/AtomListItemIconSmall';
import AtomListItemText from '../ListItemText';

const useStyles = makeStyles(theme => ({
  listItemText: {
    wordBreak: 'break-word',
  },
  action: {
    marginLeft: theme.spacing(1),
    whiteSpace: 'nowrap',
  },
}));

/* list item nâng cao */
const ListItemAdvanced = forwardRef((props, ref) => {
  const {
    avatar,
    icon,
    primary,
    primaryProps,
    secondary,
    secondaryProps,
    action,
    children,
    ...restProps
  } = props;

  const classes = useStyles();

  return (
    <AtomListItem ContainerComponent="div" {...restProps} ref={ref}>
      {children || (
        <>
          {avatar && <AtomListItemAvatar>{avatar}</AtomListItemAvatar>}
          {icon && <AtomListItemIconSmall>{icon}</AtomListItemIconSmall>}
          <AtomListItemText
            classes={{
              root: classes.listItemText,
            }}
            primary={primary}
            primaryTypographyProps={primaryProps}
            secondary={secondary}
            secondaryTypographyProps={{ component: 'div', ...secondaryProps }}
          />
          <div className={classes.action}>{action}</div>
        </>
      )}
    </AtomListItem>
  );
});
export default ListItemAdvanced;

ListItemAdvanced.propTypes = {
  avatar: PropTypes.node,
  icon: PropTypes.node,
  primary: PropTypes.node, // text chính
  primaryProps: PropTypes.object, // customize text chính
  secondary: PropTypes.node, // text phụ
  secondaryProps: PropTypes.object, // customize text phụ
  action: PropTypes.node, // action
  children: PropTypes.node, // custom content
};
