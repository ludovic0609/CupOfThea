
import Header from "./Header";
import Footer from "./Footer";
import {setLogin} from "../actions/actions-types";
import { useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
    const [user, setUser] = useState({email: "",password:""});
    const [userLogin,setUserLogin] = useState(false);
    const[messageError,setMessageError]=useState("");

    const { isLogged } = useSelector(state => state);
    const { role } = useSelector(state => state);
    const navigate = useNavigate();


    const dispatch = useDispatch();

    //en fonction du role de l'utilsateur connecter on les envoie vers différentes pages
    useEffect(() => {
        if(isLogged==true && role==="User"){
            navigate('/');
        }
        if(isLogged==true && role==="Admin"){
            navigate('/admin/dashboard');
        }

    
      },[isLogged] );
   
    const handleChange = (event)  => {
        event.preventDefault();
        setMessageError("");
        const {name, value} = event.target;
        setUser(oldUser => {
        return {
        ...user,
        [name]: value,
      };
    });
}

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if( user.email==="" || user.password===""){
            setMessageError("un des champ n'a pas été renseigné.");
            setUserLogin(false);
            return;
        }

            fetch('http://localhost:8080/login/', {
                method: "POST",
                headers: {
                  'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
              })
              .then((response) => {
                if (response.status==200) {
                  return response.json();
                }
                throw new Error("email ou mot de passe incorrect");
              
              })
              .then((result) => {
                if(result){
                        
                        dispatch(setLogin({result}));
                        
                        
                }
              })
              .catch((error)=>{
                
                setMessageError(error.toString());
              })
        
    };
    return (
        <>
        <Header/>
     
         <div id="login">
            <h3 className={"text-center text-white pt-5"}></h3>
            <div className={"container"}>
            <div id="login-row" className={"row justify-content-center align-items-center"}>
                <div id="login-column" className={"col-md-6"}>
                    <div id="login-box" className={"col-md-12"}>
                        <form id="login-form" className={"form"}  method="post" onSubmit={handleSubmit}>
                            <h3 className={"text-center text-info"}>Connexion</h3>
                            <div className={"form-group"}>
                                <label htmlFor="email" className={"text-info"}>Email :</label><br/>
                                <input type="email" name="email" id="email" required className={"form-control"} onChange={handleChange}/>
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor="password" className={"text-info"}>Mot de passe :</label><br/>
                                <input type="password" required name="password" id="password" className={"form-control"} onChange={handleChange}/>
                            </div>

                            <div className={"form-group"}>
                                <label htmlFor="error-message" style={{color:"red"}}>{messageError}</label>
                            </div>
                            <div className={"form-group"}>
                          
                                
                                <input type="submit" className={"btn btn-info btn-md"}  value="Connexion" />
                            </div>

                            <div id="register-link" className={"text-right"} style={{paddingTop:30}}>
                                <a href="/create_account" className={"text-info"}>Création d'un compte</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <Footer/>
        </>
    )
}
export default Login;