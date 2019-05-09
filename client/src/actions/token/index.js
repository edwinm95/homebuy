import * as types from './types' 

export const addToken = (token) =>  dispatch =>  {
    return dispatch({type: types.ADD_TOKEN, token: token })
}
export const removeToken = () =>  dispatch =>  {
    return dispatch({type: types.REMOVE_TOKEN})
}