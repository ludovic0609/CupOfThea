import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import {disconnect} from "../../actions/actions-types";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const NavAdmin = () => {

    const { isLogged } = useSelector(state => state);
    const { role } = useSelector(state => state);

    const navigate = useNavigate();
   
    const dispatch = useDispatch();
    const handleClick = (event)  => {
      dispatch(disconnect({event}));
  };

  //si l'utilsateur n'est pas admin alors il sera redigirer vers la page d'accueil
  useEffect(() => {
    if(isLogged==false && role===""){
        navigate('/');
    }
    if(isLogged==true && role==="User"){
      navigate('/');
  }

  },[isLogged,role] );

 
    return (
        <>
      <div className={"topnav"} id="myTopnav">
  <NavLink to="/admin/dashboard" >Accueil</NavLink>
  <NavLink to="/admin/dashboard/add/tea">Ajouter un Tea</NavLink>
  <NavLink to="/admin/dashboard/commandes">Les commandes</NavLink>
  <NavLink  onClick={handleClick}>Se deconnecter</NavLink>
    </div>
    </>
    )
}
export default NavAdmin;