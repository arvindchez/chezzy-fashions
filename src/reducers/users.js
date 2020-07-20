import { userConstants } from '../constants/user';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.DELETE_USER_REQUEST:
      return {
        ...state,
        items: state.items.map(user =>
          user._id === action._id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_USER_SUCCESS:
      return {
        items: state.items.filter(user => user._id !== action._id)
      };
    case userConstants.DELETE_USER_FAILURE:
      return {
        ...state,
        items: state.items.map(user => {
          if (user._id === action._id) {
            const { deleting, ...userCopy } = user;
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}