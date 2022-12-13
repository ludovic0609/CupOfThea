import { redirect } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
    const [user, setUser] = useState({civilite:"",nom: "", prenom :"",adresse:"",code_postal:"",commune:"", tel: "",email: "",password:"", password_2:""});
    const [userAdd,setUserAdd] = useState(false);
    const [userMailExist,setUserMailExist]=useState(false);
    const[messageError,setMessageError]=useState("");

    const navigate = useNavigate();

    const handleChange = (event)  => {
        event.preventDefault();
        const {name, value} = event.target;
        setUser(oldUser => {
        return {
        ...user,
        [name]: value,
      };
    });

    if(user.email!=""){
        fetch('http://localhost:8080/users/email/'+user.email)
        .then(
            response => response.json())
        .then(res => {
            if(res.length>0){
                setUserMailExist(true);
            }
            else{
                setUserMailExist(false);
            }
        });
    }
   
    

}

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if(user.civilite==="" || user.nom==="" || user.prenom===""
         || user.tel==="" || user.email==="" || user.password==="" || user.password_2===""){
            setMessageError("un des champ n'a pas été renseigné.");
            setUserAdd(false);
            return;
        }

        if(user.password!==user.password_2){
                setMessageError("les mots de passes ne sont pas indentiques.");
                setUserAdd(false);
                return;
        }

        if(userMailExist===true){
            setMessageError("le mail existe déjà.");
            setUserAdd(false);
            return;
        }

        if(userMailExist===false){
            fetch('http://localhost:8080/users/register', {
                method: "POST",
                headers: {
                  'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
              })
              .then((response) => response.json())
              .then((result) => {
                if(result){
                    setUserAdd(true);
                    navigate('/login');
                }
                
              })
        }
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
                        <form id="login-form" className={"form"} method="post" onSubmit={handleSubmit}>
                            <h3 className={"text-center text-info"}>Inscription</h3>

                            <div className={"form-group"}>
                            <label htmlFor="civilite" className={"text-info"}>Civilité <span style={{color:"red"}}>*</span> :</label>
                            <select name="civilite" required onChange={handleChange}>
                                <option value="">Selectionnez...</option>
                                <option value="M">M</option>
                                <option value="Mme">Mme</option>
                            </select>
                            </div>

                            <div className={"form-group"}>
                            <label htmlFor="nom" className={"text-info"}>Nom <span style={{color:"red"}}>*</span>:</label>
                                <input type="text" name="nom" id="nom" required className={"form-control"} onChange={handleChange}/>
                            </div>
                            <div className={"form-group"}>
                            <label htmlFor="prenom" className={"text-info"}>Prénom  <span style={{color:"red"}}>*</span>:</label>
                                <input type="text" name="prenom" id="prenom" required className={"form-control"} onChange={handleChange}/>
                            </div>
                            <div className={"form-group"}>
                            <label htmlFor="adresse" className={"text-info"}>Adresse :</label>
                                <input type="text" name="adresse" id="adresse" className={"form-control"} onChange={handleChange}/>
                            </div>
                            <div className={"form-group"}>
                            <label htmlFor="code_postal" className={"text-info"}>Code postal :</label>
                                <input type="text" name="code_postal" id="code_postal" className={"form-control"} onChange={handleChange}/>
                            </div>
                            <div className={"form-group"}>
                            <label htmlFor="commune" className={"text-info"}>Commune :</label>
                                <input type="text" name="commune" id="commune" className={"form-control"} onChange={handleChange}/>
                            </div>




                            <div className={"form-group"} style={{paddingTop:25}}>
                                <label htmlFor="email" className={"text-info"}>Email <span style={{color:"red"}}>*</span>:</label>
                                <input type="email" name="email" id="email" required className={"form-control"} onChange={handleChange}/>
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor="tel" className={"text-info"}>Téléphone <span style={{color:"red"}}>*</span>:</label>
                                <input type="text" name="tel" id="tel" required className={"form-control"} onChange={handleChange}/>
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor="password" className={"text-info"}>Mot de passe <span style={{color:"red"}}>*</span>:</label>
                                <input type="password" name="password" required id="password" className={"form-control"} onChange={handleChange}/>
                            </div>
                            <div className={"form-group"}>
                                <label htmlFor="password_2" className={"text-info"}>Confirmer le Mot de passe <span style={{color:"red"}}>*</span> :</label>
                                <input type="password" name="password_2" required id="password_2" className={"form-control"} onChange={handleChange}/>
                            </div>

                            <div className={"form-group"}>
                                <label htmlFor="error-message" style={{color:"red"}}>{messageError}</label>
                            </div>
                            
                            <div className={"form-group"}>
                                
                                <input type="submit" name="submit" className={"btn btn-info btn-md"} value="S'enregistrer"/>
                            </div>
                            <div id="register-link" className={"text-right"} style={{paddingTop:30}}>
                                <a href="/login" className={"text-info"}>Se connecter</a>
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
export default CreateAccount;