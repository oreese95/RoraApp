const initialData = {
    users : []
};

export const usersReducer = (state=initialData ,  action)=>{

switch(action.type)
{
    case 'GET_ALL_USERS' : {
        return{
            ...state,
            users : action.payload
        }
    }

    default: return state
}

}