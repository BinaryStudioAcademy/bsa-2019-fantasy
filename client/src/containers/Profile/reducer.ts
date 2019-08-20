import { SET_USER, SET_IS_LOADING, CHANGE_LANGUAGE, UserAction } from './action.type';
import { User } from 'types/user.type';

type State = {
  user: User | null;
  isAuthorized: boolean;
  isLoading: boolean;
  language: string;
};

const initialState: State = {
  user: null,
  isAuthorized: false,
  isLoading: true,
  language: 'en',
};

export default (state = initialState, action: UserAction) => {
  switch (action.type) {
    case SET_USER:
      const user = action.payload;
      return {
        ...state,
        user,
        isAuthorized: Boolean(user && user.id),
      };

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case CHANGE_LANGUAGE: {
      return {
        ...state,
        language: action.payload.language,
      };
    }
    default:
      return state;
  }
};
