export const loadStore = () => {
    try{
        const serializedStore = localStorage.getItem('state');
        if(serializedStore === null){
            return undefined;
        }
        return JSON.parse(serializedStore)
    }catch(error){
        return undefined
    }
}

export const saveStore = (state) => {
    try{
        const serializedStore = JSON.stringify(state)
        localStorage.setItem('state',serializedStore)
    }catch(error){
        
    }
}