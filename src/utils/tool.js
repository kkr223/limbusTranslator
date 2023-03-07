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
export function loadSource(arr,item){
    for(let i in item){
        if(item[i] instanceof Array){
            arr.push(i)
            return arr
        }else if(item[i] instanceof Object){
            arr.push(i)
            return loadSource(arr,item[i])
        }
    }
}