/**
 *
 * DemoDataFile
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ReactExport from 'react-data-export';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import makeSelectDemoDataFile from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;
const dataSet1 = [
  {
    name: 'Johson',
    amount: 30000,
    sex: 'M',
    is_married: true,
  },
  {
    name: 'Monika',
    amount: 355000,
    sex: 'F',
    is_married: false,
  },
  {
    name: 'John',
    amount: 250000,
    sex: 'M',
    is_married: false,
  },
  {
    name: 'Josef',
    amount: 450500,
    sex: 'M',
    is_married: true,
  },
];

const useStyles = makeStyles({
  container: {
    position: 'relative',
  },
});

const ListContainer = props => {
  const classes = useStyles();
  return <Container maxWidth="sm" className={classes.container} {...props} />;
};
export function DemoDataFile() {
  useInjectReducer({ key: 'demoDataFile', reducer });
  useInjectSaga({ key: 'demoDataFile', saga });
  const data = new Array(1000).fill().map((value, id) => ({
    id,
    title: dataSet1[0].name,
    body: dataSet1[0].amount,
  }));

  function rowRenderer({ key, index, style }) {
    return (
      <div key={key} style={style}>
        {data[index].title} + {index} <br />
        {data[index].body} <br />
      </div>
    );
  }

  const isItemLoaded = index => index < data.length && data[index] !== null;
  // const loadMoreItems = (startIndex, stopIndex) => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       const newData = [...data];
  //       for (let idx = startIndex; idx < stopIndex; idx++) {
  //         newData[idx] = faker.lorem.sentence();
  //       }
  //       setData(newData);
  //       resolve();
  //     }, 2000);
  //   });
  // };
  return (
    <div>
      <Helmet>
        <title>DemoDataFile</title>
        <meta name="description" content="Description of DemoDataFile" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <ExcelFile>
        <ExcelSheet data={dataSet1} name="Employees">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Wallet Money" value="amount" />
          <ExcelColumn label="Gender" value="sex" />
          <ExcelColumn
            label="Marital Status"
            value={col => (col.is_married ? 'Married' : 'Single')}
          />
        </ExcelSheet>
      </ExcelFile>
      {/* <AutoSizer>
        {({ height, width }) => (
          <List
            height={data.length}
            rowCount={data.length}
            rowHeight={200}
            rowRenderer={rowRenderer}
            width={width}
            disableHeight
          />
        )}
      </AutoSizer> */}
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={data.length}
            // loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <List
                className="List"
                height={height}
                width={width}
                itemCount={data.length}
                itemSize={230}
                itemData={data}
                innerElementType={ListContainer}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
                {rowRenderer}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
}

DemoDataFile.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  demoDataFile: makeSelectDemoDataFile(),
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
)(DemoDataFile);
