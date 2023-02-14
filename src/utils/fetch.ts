const baseUrl = "http://localhost:8000"
type handlerFunc = (data: any) => void
function jsonFetch(path:string, handler: handlerFunc){
    console.log(baseUrl+path)
    fetch(baseUrl+path).then(
        res=>res.json()
    ).then(
        handler
    )
}

export { jsonFetch}
