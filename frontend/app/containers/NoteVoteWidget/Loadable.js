/**
 *
 * Asynchronously loads the component for NoteVoteWidget
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
