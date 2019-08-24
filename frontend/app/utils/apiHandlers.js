import axios from 'axios';
import {createSelector} from "reselect";

export const AUTH_TOKEN_OBTAIN_ENDPOINT = process.env.API_URL + '/auth/token/obtain/';
export const AUTH_TOKEN_REFRESH_ENDPOINT = process.env.API_URL + '/auth/token/refresh/';
export const AUTH_REGISTER_ENDPOINT = process.env.API_URL + '/auth/register/';

export const NOTE_ADD_ENDPOINT = process.env.API_URL + '/notes/add/';
export const NOTES_FETCH_ENDPOINT = process.env.API_URL + '/notes/';

export const TIMELINE_FETCH_ENDPOINT = process.env.API_URL + '/notes/timeline/';
export const PAGINATED_TIMELINE_FETCH_ENDPOINT = process.env.API_URL + '/notes/timeline/paginated/?id=';

export const NOTE_MAKEPRIVATE_ENDPOINT = process.env.API_URL + '/notes/{0}/makePrivate';
export const NOTE_MAKEPUBLIC_ENDPOINT = process.env.API_URL + '/notes/{0}/makePublic';

export const NOTE_UPVOTE_ENDPOINT = process.env.API_URL + '/notes/{0}/upVote';
export const NOTE_DOWNVOTE_ENDPOINT = process.env.API_URL + '/notes/{0}/downVote';


export const TAGS_FETCH_ENDPOINT = process.env.API_URL + '/tags/all/';
export const POPULAR_TAGS_FETCH_ENDPOINT = process.env.API_URL + '/tags/popular/';
export const TAG_TIMELINE_FETCH_ENDPOINT = process.env.API_URL + '/tags/{0}/?id=';


if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
    });
  };
}


export const loginHandler = (username, password) => {
  // console.log("in login handler", username, password)
  return axios.post(AUTH_TOKEN_OBTAIN_ENDPOINT, {
    username: username,
    password: password,
  })
    .then(response => response.data)
    .catch(error => {
      throw error.response.data
    })
};

export const registerHandler = (fields) => {
  // console.log("in login handler", username, password)
  let data = {
    username: fields.username,
    first_name: fields.first_name,
    last_name: fields.last_name,
    email: fields.email,
    password: fields.password,
  };
  return axios.post(AUTH_REGISTER_ENDPOINT, data)
    .then(response => response.data)
    .catch(error => {
      throw error.response.data
    })
};

export const noteAddHandler = (title, body, image, tags) => {
  // console.log("in note add handler", image)
  // var imageForm = null;
  // if(image != undefined){
  //   imageForm = new FormData();
  //   imageForm.append('image', image, image.name);
  // }

  // TODO figure out what to do when the form fails due to non-form related issues
  let formData = new FormData();
  formData.append('title', title);
  formData.append('body', body);
  if(image != null) formData.append('image', image);
  formData.append('tags', JSON.stringify(tags))
  return axios.post(NOTE_ADD_ENDPOINT, formData
    , { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(response => response.data)
    .catch(error => {
      // console.log(error)
      throw error.response.data
    })
};

export const fetchNotesHandler = () => {
  return axios.get(NOTES_FETCH_ENDPOINT)
    .then(response => response.data)
    .catch(error => {
      throw error.response.data
    });
};

// TODO handle how errors are handled in this callback
export const refreshAccessToken = (refresh_token, callback = (res) => res.data) => {
  return axios.post(AUTH_TOKEN_REFRESH_ENDPOINT, {refresh: refresh_token})
    .then(response => callback(response.data.access))
    .catch(error => {
      console.log(error)
      // throw error.response.data
    });
};

export const fetchTimelineHandler = () => {
  return axios.get(TIMELINE_FETCH_ENDPOINT)
    .then(response => response.data)
    .catch(error => {
      throw error.response.data
    });
};

export const fetchPaginatedTimelineHandler = (link = PAGINATED_TIMELINE_FETCH_ENDPOINT) => {
  return axios.get(link)
    .then(response => response.data)
    .catch(error => {
      throw error.response.data
    });
};

export const fetchTagTimelineHandler = (link, tag_title) => {

  if(link === undefined || link === null){
    link = TAG_TIMELINE_FETCH_ENDPOINT.format(tag_title)
  }

  return axios.get(link)
    .then(response => response.data)
    .catch(error => {
      throw error.response.data
    });
};

export const noteMakePublicHandler = (note_id) => {
  return axios.post(NOTE_MAKEPUBLIC_ENDPOINT.format(note_id))
    .then(response => response.data)
    .catch(error => {
      throw error.response.data
    });
};

export const noteMakePrivateHandler = (note_id) => {
  return axios.post(NOTE_MAKEPRIVATE_ENDPOINT.format(note_id))
    .then(response => response.data)
    .catch(error => {
      throw error.response.data
    });
};

export const noteUpVoteHandler = (note_id) => {
  return axios.post(NOTE_UPVOTE_ENDPOINT.format(note_id))
    .then(response => ({
      upvotes: response.data.upvotes,
      downvotes: response.data.downvotes}))
    .catch(error => {
      throw error.response.data
    });
};

export const noteDownVoteHandler = (note_id) => {
  return axios.post(NOTE_DOWNVOTE_ENDPOINT.format(note_id))
    .then(response => ({
      upvotes: response.data.upvotes,
      downvotes: response.data.downvotes}))
    .catch(error => {
      throw error.response.data
    });
};


export const fetchTagsHandler = (callback) => {
  return axios.get(TAGS_FETCH_ENDPOINT)
    .then(response => callback(response.data))
    .catch(error => {
      throw error
    });
};

export const fetchPopularTagsHandler = () => {
  return axios.get(POPULAR_TAGS_FETCH_ENDPOINT)
    .then(response => response.data)
    .catch(error => {
      throw error.response.data
    });
};
