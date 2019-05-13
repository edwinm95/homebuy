import * as types from './types' 

export const addToken = (token) =>  dispatch =>  {
    return dispatch({type: types.ADD_TOKEN, token: token })
}
export const removeToken = () =>  dispatch =>  {
    return dispatch({type: types.REMOVE_TOKEN})
}
export const refreshToken = (token) => async dispatch => {
    const requestBody = {
        query: 
        `
            query {
                refreshToken {
                    token
                }
            }
        `
    }
        const response = await fetch('http://localhost:5000/graphql',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
          })
        const responseData = await response.json()
        const {errors, data} = responseData
        if(errors){
            return dispatch({type: types.REFRESH_TOKEN, token: null}) 
        }else{
            const {token} = data.refreshToken
            return dispatch({type: types.REFRESH_TOKEN, token: token}) 
        }

}