import * as actions from '../actions/token/types'

export default (state = {}, action) => {
    switch(action.type){
        case actions.ADD_TOKEN :
            state = action.token
            return state;
        case actions.REMOVE_TOKEN :
            state = null;
            return state;
        case actions.REFRESH_TOKEN :
            state = action.token;
            return state;
        default: 
            return state;
    }
}