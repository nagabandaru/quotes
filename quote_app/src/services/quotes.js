export function getQuotes(id){
    return fetch(`http://localhost:3000/quote/${id}`)
    .then((r)=>r.json());
}