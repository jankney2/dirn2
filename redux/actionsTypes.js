export const setUser=(response)=>{
    return {
        type:'SET_USER', 
        payload:response
    }

}

export const updateDisplayProperty=(response)=>{
    return {
        type:'UPDATE_DISPLAY_PROPERTY', 
        payload:response
    }

}

export const updatePropertyDistances=(response)=>{
    return {
        type:'UPDATE_DISTANCES', 
        payload:response
    }
}