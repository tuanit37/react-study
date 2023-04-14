import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import AtomDialog from './atoms/Dialog';
import {
  DialogAdvancedTitle,
  StyledDialogActions,
  StyledDialogContent,
} from './styleCustom';

export default function DialogAdvanced(props) {
  const {
    open,
    onClose,
    onBack,
    title,
    content,
    actions,
    dialogProps,
    dialogContentProps,
    dialogActionsProps,
    fullScreenDown,
    fullScreen,
    maxWidth,
    children,
    disableBackdropClick,
  } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(fullScreenDown));

  return (
    <AtomDialog
      aria-labelledby="dialog-advanced"
      open={open}
      onClose={disableBackdropClick ? undefined : onClose}
      fullWidth
      maxWidth={maxWidth}
      fullScreen={fullScreen || (fullScreenDown && matches)}
      {...dialogProps}
    >
      {children || (
        <React.Fragment>
          {title && (
            <DialogAdvancedTitle onBack={onBack} onClose={onClose}>
              {title}
            </DialogAdvancedTitle>
          )}
          {content && (
            <StyledDialogContent {...dialogContentProps}>
              {content}
            </StyledDialogContent>
          )}
          {actions && (
            <StyledDialogActions {...dialogActionsProps}>
              {actions}
            </StyledDialogActions>
          )}
        </React.Fragment>
      )}
    </AtomDialog>
  );
}
DialogAdvanced.propTypes = {
  open: PropTypes.bool, // control đóng/mở dialog
  onClose: PropTypes.func, // action cho nút đóng dialog
  onBack: PropTypes.func, // action cho nút quay lại
  title: PropTypes.node, // tiêu đề dialog
  content: PropTypes.node, // nội dung
  actions: PropTypes.node, // hành động
  dialogProps: PropTypes.object,
  dialogContentProps: PropTypes.object,
  dialogActionsProps: PropTypes.object,
  fullScreenDown: PropTypes.string, // hiển thị toàn màn hình ở mobile, mặc định "xs"
  fullScreen: PropTypes.bool, // hiển thị toàn màn hình
  maxWidth: PropTypes.string, // độ rộng tối đa
  children: PropTypes.node, // tự custom nội dung dialog
  disableBackdropClick: PropTypes.bool, // chặn click bên ngoài dialog để tắt
};
DialogAdvanced.defaultProps = {
  open: false,
};

/* thêm prop disableEnforceFocus: true vào dialog nếu muốn action với tooltip ở trong dialog */
