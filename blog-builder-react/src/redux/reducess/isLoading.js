const loadingReducer = (prevState=true,action)=>{
  const {type,payload} = action
  if(type==='loading'){
    return payload
  }else{
    return prevState
  }
}

export default loadingReducer