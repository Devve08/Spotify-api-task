export const loginToSpotify = (url:any) => {
    window.location = url
}

export const getReturnedParams = (params: any) => {
    if(!params){
        return
    }else{
        const string = params.substring('1')
        const paramsSplit = string.split('&')
        const paramsObject = paramsSplit.reduce((acc:any, value:any)=>{
            const [key, v]= value.split("=");
            acc[key] = v;
            return acc
        }, {})
        return paramsObject
    }
   
}