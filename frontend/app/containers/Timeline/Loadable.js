/**
 *
 * Asynchronously loads the component for Timeline
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
