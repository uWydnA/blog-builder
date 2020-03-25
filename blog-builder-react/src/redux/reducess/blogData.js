const BlogDateReducer = (prevState=[],action)=>{
  let{type,payload} = action
  if(type==='blogdata'){
    let newarr = [...prevState,...payload];
    return newarr
  }else{
    return prevState
  }
}
export default BlogDateReducer