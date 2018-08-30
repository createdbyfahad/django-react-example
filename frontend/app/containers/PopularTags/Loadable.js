/**
 *
 * Asynchronously loads the component for PopularTags
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
