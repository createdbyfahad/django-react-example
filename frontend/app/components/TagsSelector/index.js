/**
 *
 * TagsSelector
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';


import './style.css';
import { WithContext as ReactTags } from 'react-tag-input';
import {fetchTagsHandler} from 'utils/apiHandlers';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

/* eslint-disable react/prefer-stateless-function */
class TagsSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);


        fetchTagsHandler(this.handleFetchTags);
    }

    handleDelete(i) {
        // const { tags } = this.state;
        // this.setState({
        //  tags: tags.filter((tag, index) => index !== i),
        // });

      this.props.handleSelectedTags(this.props.tags.filter((tag, index) => index !== i))
    }

    handleAddition(tag) {
        // this.setState(state => ({ tags: [...state.tags, tag] }));
      if(this.props.tags.length >= 3) return false
      let found = false;
      this.state.suggestions.forEach((suggestion) => {if(suggestion.id === tag.id) found = true});
      if(found){
        const currentTags = this.props.tags;
        this.props.handleSelectedTags([...currentTags, tag])
      }
    }

    handleFetchTags = (newTags) => {
      const tags = newTags.map((tag) => ({id: String(tag.id), text: tag.title}));
      this.setState({ suggestions: tags })
    };

  render() {
    const { suggestions } = this.state;
    return (
      <div>
        <ReactTags tags={this.props.tags}
            suggestions={suggestions}
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            delimiters={delimiters}
            autocomplete={true}
            maxLength={16}
            minQueryLength={1} />
      </div>
    );
  }
}

TagsSelector.propTypes = {};

export default TagsSelector;
