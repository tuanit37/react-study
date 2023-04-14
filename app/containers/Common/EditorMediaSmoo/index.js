import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme } from '@material-ui/core';
import ComposeDialog from './atom/ComposeDialog';
import ComposeHeader from './atom/ComposeHeader';
import ContentEditor from './ContentEditor';
function EditorMediaSmoo(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  const { open, media, onClose, onCompleted, onProgress } = props;
  const [openModal, setOpen] = useState(open || false);
  console.log('openModal: ', open);
  useEffect(() => {
    if (open) setOpen(open);
  }, [open]);
  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };
  return (
    <React.Fragment>
      <ComposeDialog
        open={openModal}
        disableBackdropClick
        onClose={() => {
          setOpen(false);
        }}
        scroll="body"
        fullWidth
        fullScreen={matches}
        maxWidth="lg"
      >
        <ComposeHeader
          title="Chỉnh sửa Ảnh/Video"
          backButtonProps={{
            onClick: handleClose,
          }}
          closeButtonProps={{
            onClick: handleClose,
          }}
        />
        <ContentEditor
          media={media}
          onResult={result => {
            if (onCompleted) onCompleted(result);
            if (handleClose) handleClose();
          }}
          handleClose={handleClose}
          onProgress={onProgress}
        />
      </ComposeDialog>
    </React.Fragment>
  );
}
EditorMediaSmoo.propTypes = {
  open: PropTypes.bool,
  media: PropTypes.any.isRequired,
  onClose: PropTypes.func,
  onCompleted: PropTypes.func,
  onProgress: PropTypes.func,
};
export default EditorMediaSmoo;
