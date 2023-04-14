import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as Icon } from './PhotoIcon.svg';

export default function(props) {
  return <SvgIcon component={Icon} {...props} />;
}
