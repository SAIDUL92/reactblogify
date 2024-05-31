import { actions } from "../actions";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = (state, action) => {

  // console.log(state.posts)
  // const test = state.posts.filter((item, index) => {
  //   console.log(item)
  //   return item.author.id === action.data[index]
  // })

  // console.log(test)
  switch (action.type) {
    case actions.post.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.post.DATA_FETCHED: {


      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.data],
      };
    }




    case actions.post.DATA_CREATED: {
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.data],
      };
    }

    case actions.post.POST_DELETED: {
      return {
        ...state,
        loading: false,

        posts: [...state.posts.filter((item) => item.id !== action.data)],
      };
    }

    case actions.post.POST_COMMENT_DELETED: {
      return {
        ...state,
        loading: false,
        posts: [...action.data],
      };
    }

    case actions.post.USER_DATA_EDITED: {
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    }

    case actions.post.POST_COMMENTED: {
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.data],
        // posts: [...state.posts, action.data],
      };
    }

    // case actions.post.POST_LIKED: {
    //   return {
    //     ...state,
    //     loading: false,
    //     posts: [...state.posts.filter((item, index) => {
    //       console.log(item.author.id === action.data[index])
    //     })],
    //   };
    // }

    case actions.post.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    default: {
      return state;
    }
  }
};

export { initialState, postReducer };
