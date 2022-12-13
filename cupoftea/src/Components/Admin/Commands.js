

import NavAdmin from "./Nav";
import { useState } from "react";
import { useEffect } from "react";
import {numCommand,displayDate,nbrArticles,calculePrixTotal} from "../../utils/utils";


const CommandsAdmin = () => {

    const [listCommands, setListCommands] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8080/commandes')
          .then(
            response => response.json())
          .then(res => {
        
            setListCommands(res);
            
           
          });
    
      }, []);

  
    
    return (
        <>
        <NavAdmin/>
        <table>
  <caption>Les commandes</caption>
  <thead>
  <tr>
    <th scope="col">Numéro de commande</th>
      <th scope="col">Date de la commande</th>
      <th scope="col">Acheteur</th>
      <th scope="col">Statut de la commande</th>
      <th scope="col">Nombres d'articles</th>
      <th scope="col">Prix total</th>
    </tr>
  </thead>
  <tbody>
  {listCommands.map((user, i) => <tr key={i}>
    
  <td data-label="Account">{numCommand(user.commande.date_commande)}</td>
      <td data-label="Due Date">{displayDate(user.commande.date_commande)}</td>
      <td data-label="Acheteur">{user.civilite} {user.nom} {user.prenom}</td>
      {user.commande.status===true  &&
                <td data-label="Due Date">Commande validé</td>
      }
      {user.commande.status===false  &&
                <td data-label="Due Date">Commande en attente</td>
      }
      <td data-label="Account">{nbrArticles(user.commande.products)}</td>
      <td data-label="Amount">{calculePrixTotal(user.commande.products).toFixed(2)} €</td>

    </tr>)}

    
  </tbody>
</table>
        </>
    )
}
export default CommandsAdmin;