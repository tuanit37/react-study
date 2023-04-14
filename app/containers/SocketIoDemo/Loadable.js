/**
 *
 * Asynchronously loads the component for SocketIoDemo
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
