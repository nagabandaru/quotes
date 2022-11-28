export async function getQuote(id){
    try{
        const response = await fetch(`http://localhost:3000/quote/${id}`);
        return await response.json();
        
    }catch(e){
        // report the error for business monitoring we can use tools like sentry.
        return {}
    }
}
export async function getQuotes(){
    try{
        const response = await fetch(`http://localhost:3000/quote`);
        return await response.json();
        
    }catch(e){
        // report the error for business monitoring we can use tools like sentry.
        return {}
    }
}