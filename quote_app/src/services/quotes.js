export function getQuote(id){
    return fetch(`http://localhost:3000/quote/${id}`)
    .then((r)=>r.json())
}
export function getQuotes(){
    return fetch(`http://localhost:3000/quote`)
    .then((r)=>r.json());
}