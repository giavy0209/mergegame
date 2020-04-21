function chance(percent){
    var random = Math.round(Math.random() * 100)
    if( random < percent){
        return true
    }else{
        return false
    }
}
export default chance