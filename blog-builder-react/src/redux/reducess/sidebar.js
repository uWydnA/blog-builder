const sideReducer = (prevState=false,action)=>{
  let {type,payload} = action
  if(type==='MySideMenuCollapsed'){
    return payload
  }else{
    return prevState
  }
}
export default sideReducer