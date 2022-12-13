import { ADD_PRODUCT, SET_COMMAND, DELETE_PRODUCT, 
    SET_LOGIN,DISCONNECT} from "../constants/actions";


    import {calculePrixTotal} from "../utils/utils";

// initialisation des states: SOURCE DE VERITE
const stateInit = {
    products: [],
    productsLocalStorage:JSON.parse(localStorage.getItem("tea")) || [],
    listChoice:"",
    price_total: 0, 
    message: '',
    sessionLocal:JSON.parse(sessionStorage.getItem("users")) || [],
    isLogged: false,
    role:""
}
const reducer = (state = stateInit, action = {}) => {

    const {products} = state;
    let {productsLocalStorage,price_total,sessionLocal} = state;

    switch(action.type){

        case ADD_PRODUCT:

            //recupere le tea et le choix de la liste
            const tea=action.payload.listTea;
            const choice=action.payload.listChoice;
           
            // const product qui va avoir le tea
            const product={
                reference:tea.reference,
                price:tea.price,
                weight:choice,
                quantity:1,
            }
            
            
            // push le product dans le localstorage, calcule le prix total, et renvoi le state
            localStorage.setItem("tea", JSON.stringify(productsLocalStorage.concat(product)));
            price_total=calculePrixTotal(productsLocalStorage);
            productsLocalStorage=JSON.parse(localStorage.getItem("tea")) || [];

            return{
            ...state,
            products: products.concat(product), // nouvelle référence du tableau
            price_total:state.price_total+product.price,
            productsLocalStorage:productsLocalStorage,
            message: `Merci pour votre ajout, ${action.payload.listTea.name} a bien été ajouté au panier`,
            }

            case DELETE_PRODUCT:
                
                // recuperer l'indice de l'article à supprimer
                const indice=action.payload.event;
                
                //supprime dans le tableau, met à jour le localstorage, le prix total et renvoi le state 
                productsLocalStorage.splice(indice,1);
                localStorage.setItem("tea", JSON.stringify(productsLocalStorage));
                price_total=calculePrixTotal(productsLocalStorage);
                return{
                    ...state,
                    price_total:price_total,   
                    productsLocalStorage:productsLocalStorage
                }

            case SET_COMMAND:

                //recuperer la totalité de la commande
                const command=action.payload.listTea;
                
                //appel du backend en post
                fetch('http://localhost:8080/command/add', {
                method: "POST",
                headers: {
                  'Content-type': 'application/json'
                },
                //passage de la commande dans le body en JSON
                body: JSON.stringify({command,sessionLocal})
              })
              .then((response) => response.json())
              .then((result) => {
                if(result){
                    //si tout c'est bien passé on vide le localstorage, on passe le price total à 0 et on renvoie le state
                    localStorage.removeItem("tea");
                }
              })
                return {
                    ...state,
                    productsLocalStorage:[],
                    price_total:0
                }

                case SET_LOGIN:
                    //on recupere l'utilisateur qui s'est connecter
                    //on initialise la sessionStorage et renvoi le state
                    const result=action.payload.result;

                    sessionStorage.setItem("users", JSON.stringify(result));
                  return{
                    ...state,
                    isLogged:result.isLogged,
                    role:result.Role,
                    sessionLocal:JSON.parse(sessionStorage.getItem("users")) || []
                } 
            
                case DISCONNECT:
                 //appel du backend en get
                fetch('http://localhost:8080/logout')
                  .then((response) => response.json())
                  .then((result) => {
                    if(result){
                        //Si tout c'est bien passé on supprime la sessionStorage de l'utilisateur et renvoi le state
                        sessionStorage.removeItem("users");  
                  
                    }
                  })

                return{
                    ...state,
                    isLogged:false,
                    role:"",
                    sessionLocal: []
                } 
            
            default:

                //initialisation du prix total, de la session, du role
                price_total=calculePrixTotal(productsLocalStorage);
                if(JSON.parse(sessionStorage.getItem("users"))!=null){
                 
                    state.isLogged=true;
                    
                    sessionLocal=JSON.parse(sessionStorage.getItem("users"));
                    state.role=sessionLocal.Role;
                    
                }else{
                    state.isLogged=false;
                    state.role="";
                    sessionLocal=[];
                }
                return{
                    ...state,
                    price_total:price_total,
                    isLogged:state.isLogged,
                    sessionLocal:sessionLocal,
                    role:state.role
                }
                
                
        
}
}
export default reducer;