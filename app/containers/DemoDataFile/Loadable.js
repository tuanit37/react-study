/**
 *
 * Asynchronously loads the component for DemoDataFile
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
