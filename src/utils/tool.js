export function pathTrans(jsonPath){
    var p = ""
    for(let i of jsonPath){
        if(typeof i == "string"){
            p+="['"+i+"']"
        }else if(typeof i == "number"){
            p+="["+i.toString()+"]"
        }
    }
    return p
}