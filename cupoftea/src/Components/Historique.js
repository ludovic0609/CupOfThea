
import Header from "./Header";
import Footer from "./Footer";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {numCommand,displayDate,nbrArticles,calculePrixTotal} from "../utils/utils";



const Historique = () => {

    const [listCommands, setListCommands] = useState([]);
    
    const { sessionLocal } = useSelector(state => state);
    const { isLogged } = useSelector(state => state);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/commandes/user/'+sessionLocal.user)
          .then(
            response => response.json())
          .then(res => {
            setListCommands(res.commande);
          });
    
      }, []);

      useEffect(() => {
        if(isLogged===false){
            navigate('/');
        }
    
      },[isLogged] );



      
      
    
    return (
        <>
		<Header/>
        <table>
  <caption>Mes commandes</caption>
  <thead>
    <tr>
    <th scope="col">Numéro de commande</th>
      <th scope="col">Date d'achat</th>
      <th scope="col">Statut de la commande</th>
      <th scope="col">Nombres d'articles</th>
      <th scope="col">Prix total</th>
    </tr>
  </thead>
  <tbody>
  {listCommands.map((command, i) => <tr key={i}>
  <td data-label="Account">{numCommand(command.date_commande)}</td>
      <td data-label="Due Date">{displayDate(command.date_commande)}</td>
      {command.status===true  &&
                <td data-label="Due Date">Commande validé</td>
      }
      {command.status===false  &&
                <td data-label="Due Date">Commande en attente</td>
      }
      <td data-label="Account">{nbrArticles(command.products)}</td>
      <td data-label="Amount">{calculePrixTotal(command.products).toFixed(2)} €</td>

    </tr>)}

    
  </tbody>
</table>
		<Footer/>
        </>
    )
}
export default Historique;