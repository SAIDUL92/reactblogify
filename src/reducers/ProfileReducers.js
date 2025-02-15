import { actions } from "../actions"

const initialState = {
    user: null,
    posts: [],
    loading: false,
    error: null
}

const profilereducer = (state, action) => {

    switch (action.type) {
        case actions.profile.DATA_FETCHING: {

            return {
                ...state,
                loading: true
            }
        }


        case actions.profile.DATA_FETCHED: {

            return {
                ...state,
                loading: false,
                user: action.data,
                posts: action.data.blogs
            }
        }

        case actions.post.POST_DELETED: {

            return {
                ...state,
                loading: false,
                posts: [...state.posts.filter(item => item.id !== action.data)]

            }
        }


        case actions.profile.USER_DATA_EDITED: {

            return {
                ...state,
                loading: false,
                user: {
                    ...action.data.user
                }

            }
        }


        case actions.profile.IMAGE_UPDATED: {

            return {
                ...state,
                loading: false,
                user: {
                    ...state.user,
                    avatar: action.data.user.avatar
                }

            }
        }


        case actions.profile.DATA_FETCH_ERROR: {

            return {
                ...state,
                loading: false,
                error: action.error,

            }
        }

        default: {
            return state
        }

    }

}


export { initialState, profilereducer }