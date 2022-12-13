import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {disconnect} from "../actions/actions-types";
import { useDispatch } from "react-redux";
const Nav = (props) => {
    const checkIsactive = ({ isActive }) => {
      return {
        
      };
    };

    const { isLogged } = useSelector(state => state);
    const { role } = useSelector(state => state);

    const dispatch = useDispatch();
    const handleClick = (event)  => {
      dispatch(disconnect({event}));
  };
  
    return (

        <nav>
            <NavLink style={checkIsactive} to="/tea">Thés</NavLink>
            
                <NavLink style={checkIsactive} to="/">Grand crus</NavLink>
           
                <NavLink style={checkIsactive} to="/">Accessoires</NavLink>
            
                <NavLink style={checkIsactive} to="/">Epicerie</NavLink>
            
                <NavLink style={checkIsactive} to="/about">Notre histoire</NavLink>
                {!isLogged  &&
                <NavLink style={checkIsactive} to="/login">Se connecter</NavLink>
              }
              {isLogged  && role==="User" &&
                <NavLink style={checkIsactive}  onClick={handleClick}>Se deconnecter</NavLink>
              }
              {isLogged  &&
                <NavLink style={checkIsactive}  to="/historique">Historique</NavLink>
              }


      </nav>
    );
  };
  
  export default Nav;