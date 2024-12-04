export function emailValidate(email){
    let emailRex = /\S+@\S+\.\S+/;
    if(typeof email !== 'string') return false; 
            return emailRex.test(String(email).toLowerCase()); 
};

