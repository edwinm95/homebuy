import * as actions from '../actions/token/types'

export default (state = null, action) => {
    switch(action.type){
        case actions.ADD_TOKEN :
            state = action.token
            return state;
        case actions.REMOVE_TOKEN :
            state = null;
            return state;
        default: 
            return state;
    }
}