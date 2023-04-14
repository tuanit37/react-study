import React from 'react';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AtomDialogTitle from './atoms/DialogTitle';
import AtomDialogContent from './atoms/DialogContent';
import AtomDialogActions from './atoms/DialogActions';
import AtomIconButton from '../Icon/IconButton';
import AtomIcon from '../Icon';
import AtomBox from '../Box';
import CloseIcon from '../../icons/CloseIcon';
import AtomSlide from '../Slide';

export const StyledDialogTitle = styled(AtomDialogTitle)(
  ({ theme }) => ({
    position: 'relative',
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    padding: theme.spacing(2),
  }),
  { name: 'StyledDialogTitle' },
);

export const StyledDialogContent = styled(AtomDialogContent)(
  ({ theme }) => ({
    padding: theme.spacing(2),
  }),
  { name: 'StyledDialogContent' },
);

export const StyledDialogActions = styled(AtomDialogActions)(
  ({ theme }) => ({
    padding: theme.spacing(2),
  }),
  { name: 'StyledDialogActions' },
);

export const ButtonBack = styled(AtomIconButton)(
  ({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
  }),
  { name: 'ButtonBack' },
);

export const ButtonClose = styled(AtomIconButton)(
  ({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  }),
  { name: 'ButtonClose' },
);

export function DialogAdvancedTitle(props) {
  const { children, onClose, onBack, ...restProps } = props;

  return (
    <StyledDialogTitle disableTypography {...restProps}>
      {onBack && (
        <ButtonBack aria-label="back" onClick={onBack}>
          <AtomIcon className="hi-Back" />
        </ButtonBack>
      )}
      <AtomBox pl={onBack && 6} pr={onClose && 6}>
        {children}
      </AtomBox>
      {onClose && (
        <ButtonClose
          aria-label="close"
          onClick={onClose}
          style={{ color: '#221e1e' }}
        >
          <AtomIcon className="hi-Close">
            <CloseIcon />
          </AtomIcon>
        </ButtonClose>
      )}
    </StyledDialogTitle>
  );
}
DialogAdvancedTitle.propTypes = {
  onBack: PropTypes.func,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <AtomSlide direction="up" ref={ref} {...props} />;
});
