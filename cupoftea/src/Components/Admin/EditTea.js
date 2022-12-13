import NavAdmin from "./Nav";
import { useState,useEffect } from "react";

import { useNavigate,useParams } from "react-router-dom";


const EditTea = () => {
    const [listeCategory, setListCategory] = useState([]);
    const [tea, setTea] = useState({name:"",reference: "", description :"",price:"",category:""});
    const [teaModify,setTeaModify] = useState(false);
    const [refTeaExist,setRefTeaExist]=useState(false);
    const[messageError,setMessageError]=useState("");

    const {id} =useParams();

    const navigate = useNavigate();

    const url_fetch="http://localhost:8080/tea/"+id;

    useEffect(() => {
		
		fetch(url_fetch)
		  .then(
			response => response.json())
		  .then(res => {
			setTea(res[0]);
			
	
		  });
	  },[] );

    useEffect(() => {
        fetch('http://localhost:8080/category')
          .then(
            response => response.json())
          .then(res => {
            setListCategory(res);
          });
          
    
      }, []);

      const handleChange = (event)  => {
        event.preventDefault();
        const {name, value} = event.target;
        setTea(oldUser => {
        return {
        ...tea,
        [name]: value,
      };
    });

}
    
    const handleSubmit = (event) =>{
        event.preventDefault();

        if(tea.name==="" || tea.reference==="" || tea.description===""
         || tea.price==="" || tea.category===""){
            setMessageError("un des champ n'a pas été renseigné.");
            setTeaModify(false);
            return;
        }

        if(tea.reference!=""){
          fetch('http://localhost:8080/tea/reference/tea/'+tea.reference,
          {method: "POST",
                  headers: {
                    'Content-type': 'application/json'
                  },
                  body: JSON.stringify({id})
              })
          .then(
              response => response.json())
          .then(res => {
            console.log(res);
              if(res.length>0){
     
                  setRefTeaExist(true);
              }else{
              
                  setRefTeaExist(false);
              }
          });
      }

        if(refTeaExist===true){
          
            setMessageError("la référence du thé existe déjà.");
            setTeaModify(false);
            return;
        }
        if(refTeaExist===false){
          
            fetch('http://localhost:8080/tea/update/'+id, {
                method: "POST",
                headers: {
                  'Content-type': 'application/json'
                },
                body: JSON.stringify(tea)
              })
              .then((response) => response.json())
              .then((result) => {
                
                setTeaModify(true);
                if(result) navigate("/admin/dashboard");
                else{
                  setMessageError("la référence du thé existe déjà.");
                  setTeaModify(false);
                  }
                
              })
        }

    };

    return (
        <>
        <NavAdmin/>
        <h1>Modifier un Thé</h1>
        <div className={"form_tea"}>
        <form method="post" onSubmit={handleSubmit}>
        <div className={"form_tea_label"}>
            <label htmlFor="name">Nom :</label> <input type="text" required name="name" id="name" value={tea.name} onChange={handleChange}></input>
        </div>
        <div className={"form_tea_label"}>
        <label htmlFor="reference">Réference :</label> <input type="text" required name="reference" id="reference" value={tea.reference} onChange={handleChange}></input>
        </div>
        <div className={"form_tea_label"}>
        <label htmlFor="description">Description :</label> <textarea name="description" required id="description" value={tea.description}  onChange={handleChange}>{tea.description}</textarea>
        </div>
        <div className={"form_tea_label"}>
        <label htmlFor="price">Prix :</label> <input type="number" name="price" required id="price" step=".01" min="0" value={tea.price} onChange={handleChange}></input>
        </div>

        <div className={"form_tea_label"}>
        <label htmlFor="category">Catégorie  :</label> 
        <select name="category" id="category" required onChange={handleChange} value={tea.category}>
            <option value="">Selectionnez...</option>
            {listeCategory.map((cat, i) => <option value={cat._id} key={i}>{cat.name}</option>)}
        </select>
        </div>

        <div className={"form-group"}>
                <label htmlFor="error-message" style={{color:"red"}}>{messageError}</label>
        </div>
        
        <button value="Sauvegarder" type="submit">Modifier</button>
        </form>
        </div>
        </>
    )
}
export default EditTea;