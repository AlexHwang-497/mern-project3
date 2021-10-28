import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING,FETCH_POST,COMMENT } from '../constants/actionTypes';
// *action.payload are our actual posts from dispatch({type:'FETCH_ALL', payload:[]})
export default (state = { isLoading: true, posts: [] }, action) => {
    switch(action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
              };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
            // console.log('this is the action.palyload of FETCH_BY_SEARCH in reducer/postsaction.payload',action.payload.data)
            // return action.payload.data;
            // return action.payload;
        case FETCH_POST:
            return { ...state, post: action.payload.post };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            // *if the post._id is === the action.payload._id(whicih is the updatedd post); then we return the action.payload
                // *action.payload is the newly updated post
            // return state.map((post) => (post._id === action.payload._id ? action.payload : post));
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE:
            // *we are first going to get all the state then we are going to filter out what we plan on  deleting
            //* post._id !== action.payload; we will then remove it
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        case LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    // *return all other posts normally
                    // *change the post that just received  a comment
                if (post._id == +action.payload._id) {
                    return action.payload;
                }
                return post;
                }),
            };
        default:
            return state;
    }
}





// const reducer = (state, action) => {
//     if(action.type==='Create'){
//         return action || state
//     }

// }