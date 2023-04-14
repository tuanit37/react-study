/**
 *
 * Asynchronously loads the component for MediaDemo
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
