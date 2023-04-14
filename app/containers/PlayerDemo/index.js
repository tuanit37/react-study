/**
 *
 * PlayerDemo
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPlayerDemo from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import PlayerSmoo from '../Common/PlayerSmoo';

export function PlayerDemo() {
  useInjectReducer({ key: 'playerDemo', reducer });
  useInjectSaga({ key: 'playerDemo', saga });

  return (
    <div>
      <Helmet>
        <title>PlayerDemo</title>
        <meta name="description" content="Description of PlayerDemo" />
      </Helmet>
      <div
        style={{
          width: '640px',
          // height: '500px',
          // alignItems: 'center',
        }}
      >
        {[3, 2, 1, 0].map(item => (
          <div
            key={item}
            style={{
              margin: '10px 0',
            }}
          >
            <PlayerSmoo
              poster="https://test-media.hahalolo.com/2021/11/12/09/22/2895bb77aa48d5a5352a6ec7590b1e9b-1636708946_640xauto_high.jpg"
              src="https://media.hahalolo.com/2022/07/25/08/57/f85c474b066268af9348879f6bb79ae8-1658739461.mp4"
              autoplay
              muted
            />
          </div>
        ))}
      </div>
    </div>
  );
}

PlayerDemo.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  playerDemo: makeSelectPlayerDemo(),
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
)(PlayerDemo);
