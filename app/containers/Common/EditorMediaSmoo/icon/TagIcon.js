import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as Icon } from './TagIcon.svg';

export default function(props) {
  return <SvgIcon component={Icon} {...props} />;
}
