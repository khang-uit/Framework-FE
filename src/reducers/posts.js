import { CompareArrowsOutlined } from '@material-ui/icons';
import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

const postsReducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state, isLoading: true};
    case END_LOADING:
      return {...state, isLoading: false};
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return {...state, posts: action.payload };
    case FETCH_POST:
      return {...state, post: action.payload};
    case LIKE:
      return {...state, posts: state.posts.map((post) => (post.id === action.payload.id ? action.payload : post))};
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === +action.payload.id) {
            return action.payload;
          }
          return post;
        }),
      };
    case CREATE:
      return {...state, posts: [...state.posts, action.payload]};
    case UPDATE:
      return {...state, posts: state.posts.map((post) => (post.id === action.payload.id ? action.payload : post))};
    case DELETE:
      return {...state, posts: state.posts.filter((post) => post.id !== action.payload)};
    default:
      return state;
  }
};

export default postsReducer;