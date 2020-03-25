const userReducer = (prevState={
    SetRoleList:[],
    SetUserList:[]
},action)=>{
    let {type,payload} = action

    switch(type){
        case "SetRoleList":
            var newState = {...prevState}
            newState.SetRoleList = payload
            return newState 
        // case "SetUserList":
        //     var newState = {...prevState}
        //     newState.SetUserList = payload
        //     return newState
        default:
            return prevState
    }
  }
  export default userReducer