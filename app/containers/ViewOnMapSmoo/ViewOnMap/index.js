/**
 *
 * ViewOnMap
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { FormattedMessage } from 'react-intl';
import makeSelectViewOnMap from './selectors';
import reducer from './reducer';
import saga from './saga';
import ButtonVOM from '../Component/Atomic/ButtonVOM';
import AtomTypography from '../Component/Atomic/AtomTypography';
import PinLocationFilledIcon from '../Component/icons/PinLocationFilledIcon';
import messages from './messages';
import DialogAdvanced from '../Component/Atomic/Dialog/DialogAdvanced';
import {
  DialogAdvancedTitle,
  Transition,
} from '../Component/Atomic/Dialog/styleCustom';
import VOMContent from '../Component/VOMContent';

export function ViewOnMap(props) {
  useInjectReducer({ key: 'viewOnMap', reducer });
  useInjectSaga({ key: 'viewOnMap', saga });
  const { detail } = props;

  // open modal
  const [isOpenModal, setOpenModal] = useState(false);
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <div>
      {!detail && (
        <ButtonVOM
          size="large"
          variant="contained"
          startIcon={<PinLocationFilledIcon />}
          onClick={handleOpen}
        >
          <AtomTypography variant="caption" component="span">
            {/* {window.intl.formatMessage(messages.viewOnMap)} */}
            <FormattedMessage {...messages.viewOnMap} />
          </AtomTypography>
        </ButtonVOM>
      )}
      <DialogAdvanced
        open={isOpenModal}
        onClose={handleClose}
        fullScreen
        maxWidth="xl"
        dialogProps={{ scroll: 'paper', TransitionComponent: Transition }}
        dialogContentProps={{ dividers: true }}
      >
        <DialogAdvancedTitle
          onClose={handleClose}
          style={{
            zIndex: 1,
            backgroundColor: 'azure',
            color: '#052122',
          }}
        >
          {/* <HotelMapFilters /> */}
          <b>
            <FormattedMessage {...messages.viewOnMap} />
          </b>
        </DialogAdvancedTitle>
        <VOMContent />
      </DialogAdvanced>
    </div>
  );
}

ViewOnMap.propTypes = {
  detail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  viewOnMap: makeSelectViewOnMap(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ViewOnMap);
