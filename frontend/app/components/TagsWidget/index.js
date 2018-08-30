/**
 *
 * TagsWidget
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {Link} from "react-router-dom";

/* eslint-disable react/prefer-stateless-function */
class TagsWidget extends React.PureComponent {
  render() {
    console.log(this.props)
    const tags = this.props.tags.map(
      tag => {
        return (<span key={tag.id}><Link to={"/tags/" + tag.title}><b>{tag.title}</b> (total: {tag.num_notes} notes)</Link>, <br /></span>)
      }
    );
    return (
      <div>
        {tags}
      </div>
    );
  }
}

TagsWidget.propTypes = {};

export default TagsWidget;
