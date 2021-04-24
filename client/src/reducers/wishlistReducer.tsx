import {POST_WISHLIST, GET_WISHLIST,DELETE_WISHLIST} from "../actions/WishlistAction"

const initialState = {
   wishlist:[],
   userWishlist:[]
}

export function wishlistReducer (state=initialState, action:any){
    switch(action.type){
        case POST_WISHLIST:
            return{
                ...state,
                wishlist: state.wishlist.concat(action.payload)
            }
        case GET_WISHLIST:
            return{
                ...state, 
                userWishlist: action.payload
            }
        case DELETE_WISHLIST:
            return{
                ...state,
                    userWishlist: state.userWishlist.filter((w:any) =>w.user_id !==action.payload)
                  
            }        
            default: return state;
    }
    
}