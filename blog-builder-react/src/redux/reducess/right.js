const rightReducer = (prevState=[],action)=>{
  let {type,payload} = action
  if(type==='right'){
    let newState = [...prevState,...payload];
    return newState
  }else{
    return prevState
  }
}
export default rightReducer