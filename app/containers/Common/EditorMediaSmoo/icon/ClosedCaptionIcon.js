import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as Icon } from './ClosedCaptionIcon.svg';

export default function(props) {
  return <SvgIcon component={Icon} {...props} />;
}
