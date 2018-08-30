/**
 *
 * PopularTags
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPopularTags from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {FETCH_TAGS_PROCESS, FETCH_TAGS_SUCCESS} from "./constants";
import TagsWidget from 'components/TagsWidget';

/* eslint-disable react/prefer-stateless-function */
export class PopularTags extends React.PureComponent {
  componentDidMount(){
    this.props.fetchTags();
  }

  render() {

    return (
      <div>
        {/*<FormattedMessage {...messages.header} />*/}
        <TagsWidget tags={this.props.populartags.tags} />
      </div>
    );
  }
}

PopularTags.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  populartags: makeSelectPopularTags(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTags: () => dispatch({
      type: FETCH_TAGS_PROCESS,
    }),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'popularTags', reducer });
const withSaga = injectSaga({ key: 'popularTags', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PopularTags);
