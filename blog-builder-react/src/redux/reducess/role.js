const roleReducer = (prevState=[],action)=>{
  let {type,payload} = action
  if(type==='role'){
    let newState = [...prevState,...payload];
    return newState
  }else{
    return prevState
  }
}
export default roleReducer