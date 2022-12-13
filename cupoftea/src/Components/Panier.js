import { NavLink } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import {deleteProduct,setCommand} from "../actions/actions-types";
import {useSelector} from "react-redux";

const Panier = () => {
    const { price_total } = useSelector(state => state);

    const { productsLocalStorage } = useSelector(state => state);
    const { isLogged } = useSelector(state => state);
    const dispatch = useDispatch();
   
    const [listTea, setListTea] = useState([]);

    useEffect(() => {
		
		setListTea(productsLocalStorage);
	  },[productsLocalStorage] );
    

  

      const handleClick = (event)  => {
        dispatch(deleteProduct({event}))
    };

    const handleCommand = (event)  => {
       
        dispatch(setCommand({listTea}));
    };

    return (
        <>
       <Header/>
       <div id="cart_view">
       {productsLocalStorage.length < 1 &&
        <h2 style={{textAlign:"center"}}>
          Aucun produit dans votre panier!
        </h2>
      }
    <ul>
        {productsLocalStorage.map((tea, i) => <li key={i} style={{textAlign:"center"}} onClick={e => handleClick(i)}>Réference du produit : {tea.reference} / Prix : {tea.price.toFixed(2)} € / Quantité : 1</li>)}    
    </ul>
    {productsLocalStorage.length >0 && isLogged &&
    <NavLink id="pay"  onClick={handleCommand} className={"waves-effect waves-light orange white-text"}>Payer <span className={"total"}>{price_total.toFixed(2)}</span>€</NavLink>
    }
    {productsLocalStorage.length >0 && !isLogged &&
    <span className={"span_login_cad"}>Vous devez etre connecté pour valider votre panier </span>
    }

    </div>
    <Footer/>
        </>
    )
}
export default Panier;