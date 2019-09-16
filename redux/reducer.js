




const initialState={
    user:{},
    displayProperty: {
        address: '',
        ownerName: '',
        distance: '',
        price:'', 
        bedrooms:'', 
        bathrooms:'', 
        notes:'', 
        latitude: 40.2485199, 
        longitude: -111.6492741
    }
}


export const mobileReducer=(state=initialState, action)=>{
    switch(action.type){
        case 'SET_USER':

        return {...state, user:action.payload, 
        }
        
        case 'UPDATE_DISPLAY_PROPERTY':

        return {...state, displayProperty:action.payload}

        case 'UPDATE_DISTANCES':
            console.log('distances')
            return {...state, propertiesWithDistance:action.payload}

        
        default:
            return state
    }
}
