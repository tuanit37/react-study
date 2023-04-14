/*
 * FeaturePage
 *
 * List all the features
 */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import H1 from 'components/H1';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';
import messages from './messages';
export default function FeaturePage() {
  const [value, onChange] = useState([new Date(), new Date()]);

  return (
    <div>
      <Helmet>
        <title>Feature Page</title>
        <meta
          name="description"
          content="Feature page of React.js Boilerplate application"
        />
      </Helmet>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
      <DateRangePicker onChange={onChange} value={value} format="dd/MM/yyyy" />
      <div>Editor: </div>
    </div>
  );
}
