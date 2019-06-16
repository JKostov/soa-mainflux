
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { LOGIN_ACTION, LOGOUT_ACTION } from '../consts/actions/apiActions';

// CREATE ACTIONS
export const loginUser = createAction(LOGIN_ACTION);
export const logoutUser = createAction(LOGOUT_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  token: null,
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {
    [LOGOUT_ACTION](state) {
      return state.merge(INITIAL_STATE);
    },

    [LOGIN_ACTION](
      state,
      {
        payload: { token },
      },
    ) {
      return state.merge({
        token,
      });
    },
  },
  INITIAL_STATE,
);
