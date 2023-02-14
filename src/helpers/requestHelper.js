async function requestApi(route, method = 'GET',token = false, body = false){
    const userLoggedToken = localStorage.getItem('authorization_token')
    const config = {
        method:method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization' :token?'Bearer '+userLoggedToken:''
        }
    }
    if(body){
        config.body = JSON.stringify(body)
    }
    const response = await fetch(`http://if-developers.com.br/api/${route}`,config)
    let result = await response.json()

    if(!response.ok){
        return { status:false, error:result.message }
    }

    return  { status:true, result };

}
export default requestApi