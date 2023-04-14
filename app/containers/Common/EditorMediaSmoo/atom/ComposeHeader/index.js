import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import AtomToolbar from '../Toolbar';
import AtomTypography from '../Typography';
import AtomIconButton from '../IconButton';
import AtomDivider from '../Divider';
import MakeGrid from '../MakeGrid';
import CloseIcon from '../../icon/CloseIcon';
import BackIcon from '../../icon/BackIcon';

const useStyles = makeStyles(theme => ({
  toolbar: {
    minHeight: theme.spacing(6),
  },
  backButton: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
  title: {
    padding: theme.spacing(0, 4),
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

/* gồm tiêu đề và nút close */
export default function ComposeHeader({
  title,
  titleProps,
  backButtonProps,
  closeButtonProps,
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AtomToolbar className={classes.toolbar}>
        <MakeGrid
          containerProps={{ spacing: 0, alignItems: 'center' }}
          grids={[
            ...((backButtonProps && [
              {
                children: (
                  <AtomIconButton
                    size="small"
                    className={classes.backButton}
                    {...backButtonProps}
                  >
                    <BackIcon />
                  </AtomIconButton>
                ),
              },
            ]) ||
              []),
            {
              children: (
                <AtomTypography
                  className={classes.title}
                  variant="h6"
                  align="center"
                  {...titleProps}
                >
                  <b>{title}</b>
                </AtomTypography>
              ),
              props: { xs: true },
            },
            ...((closeButtonProps && [
              {
                children: (
                  <AtomIconButton
                    size="small"
                    className={classes.closeButton}
                    {...closeButtonProps}
                  >
                    <CloseIcon />
                  </AtomIconButton>
                ),
              },
            ]) ||
              []),
          ]}
        />
      </AtomToolbar>
      <AtomDivider />
    </React.Fragment>
  );
}
ComposeHeader.propTypes = {
  title: PropTypes.node, // tiêu đề màn hình
  titleProps: PropTypes.object, // tùy chỉnh tiêu đề
  backButtonProps: PropTypes.object, // nút quay lại màn hình trước
  closeButtonProps: PropTypes.object, // nút đóng compose
};
ComposeHeader.defaultProps = {
  title: 'Trình soạn thảo',
};
