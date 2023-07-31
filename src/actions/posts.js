import * as api from '../api';
import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE, COMMENT} from '../constants/actionTypes.js'
//Action Creators
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        dispatch({ type: FETCH_POST, payload: data.post  });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}


export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        dispatch({ type: FETCH_ALL, payload: data  });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error);
    }
}


export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);

        history.push(`/posts/${data.data.id}`);

        dispatch({ type: CREATE, payload: data.data })
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
      await api.deletePost(id);
  
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
  
    try {
      const { data } = await api.likePost(id, user?.token);
  
      dispatch({ type: LIKE, payload: data.post });
    } catch (error) {
      console.log(error);
    }
};

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data }  = await api.comment(value, id);
        if(data.error === false){
            dispatch({ type: COMMENT, payload: data.post });
        }
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const report = (id, msg) => async(dispatch) => {
    try {
        const { data }  = await api.report(id, msg);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const getReports = () => async(dispatch) => {
    try {
        const { data }  = await api.getReports();
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const getViews = () => async(dispatch) => {
    try {
        const { data }  = await api.getViews();
        return data;
    } catch (error) {
        return error.response.data;
    }
}