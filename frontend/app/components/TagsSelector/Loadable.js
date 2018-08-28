/**
 *
 * Asynchronously loads the component for TagsSelector
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
