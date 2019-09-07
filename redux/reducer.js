



const initialState={
    user:{},
    displayProperty: {}
}


export const mobileReducer=(state=initialState, action)=>{
    switch(action.type){
        case 'SET_USER':

        return {...state, user:action.payload}
        
        case 'UPDATE_DISPLAY_PROPERTY':

        return {...state, displayProperty:action.payload}

        
        default:
            return state
    }
}
