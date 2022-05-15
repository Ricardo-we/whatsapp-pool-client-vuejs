const LOCAL_STORAGE_PREFIX = 'whatsapp-pool-v2-';

export function getLocalStorage(key){
    try{
        let storedItem = localStorage.getItem(LOCAL_STORAGE_PREFIX + key)
        if(!storedItem) storedItem = setLocalStorageItem(key, {});
        return JSON.parse(storedItem);
    } catch(error){
        return null
    }
}

export function setLocalStorageItem(key, value){
    try{
        localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify(value))
        return JSON.stringify(value)
    } catch(error){
        localStorage.setItem(LOCAL_STORAGE_PREFIX + key, '');
        return ''
    }
}

