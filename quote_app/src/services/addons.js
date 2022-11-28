export function getAddons(id){
    return fetch(`http://localhost:3000/addons`)
    .then((r)=>r.json())
    .catch(e=>{
        return []
    });
}