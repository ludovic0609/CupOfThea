export function numCommand(date_command){
    const date = new Date(date_command);

    return date.getTime();
}

export function displayDate(date_command){
    const date_format = new Date(date_command);
    return date_format.toLocaleString("fr-FR");
}

export function nbrArticles(tab){
    return tab.length;
}
export function calculePrixTotal(productsLocalStorage){
    let val=0;
    for(let i=0;i<productsLocalStorage.length;i++){
        val+=productsLocalStorage[i].price;
    }
    return val;
}