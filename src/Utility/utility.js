export const checkPrime = (id) => {
    for(let i=2;i<= id/2;i++){
      if(id%i === 0) return false;
      
    }
    return true
}