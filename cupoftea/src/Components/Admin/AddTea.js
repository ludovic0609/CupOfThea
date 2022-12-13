import NavAdmin from "./Nav";
import { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";

const AddTea = () => {
    const [listeCategory, setListCategory] = useState([]);
    const [tea, setTea] = useState({name:"",reference: "", description :"",price:"",category:""});
    const [teaAdd,setTeaAdd] = useState(false);
    const [refTeaExist,setRefTeaExist]=useState(false);
    const[messageError,setMessageError]=useState("");

    const navigate = useNavigate();


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

    if(tea.reference!=""){
        fetch('http://localhost:8080/tea/reference/'+tea.reference)
        .then(
            response => response.json())
        .then(res => {
            if(res.length>0){
                setRefTeaExist(true);
            }else{
                setRefTeaExist(false);
            }
        });
    }
}
    
    const handleSubmit = (event) =>{
        event.preventDefault();

        if(tea.name==="" || tea.reference==="" || tea.description===""
         || tea.price==="" || tea.category===""){
            setMessageError("un des champ n'a pas été renseigné.");
            setTeaAdd(false);
            return;
        }

        if(refTeaExist===true){
            setMessageError("la référence du thé existe déjà.");
            setTeaAdd(false);
            return;
        }
        if(refTeaExist===false){
            fetch('http://localhost:8080/tea/add', {
                method: "POST",
                headers: {
                  'Content-type': 'application/json'
                },
                body: JSON.stringify(tea)
              })
              .then((response) => response.json())
              .then((result) => {
                setTeaAdd(true);
                if(result) navigate("/admin/dashboard");
                
              })
        }

    };

    return (
        <>
        <NavAdmin/>
        <h1>Ajouter un Thé</h1>
        <div className={"form_tea"}>
        <form method="post" onSubmit={handleSubmit}>
        <div className={"form_tea_label"}>
            <label htmlFor="name">Nom :</label> <input type="text" required name="name" id="name" onChange={handleChange}></input>
        </div>
        <div className={"form_tea_label"}>
        <label htmlFor="reference">Réference :</label> <input type="text" required name="reference" id="reference" onChange={handleChange}></input>
        </div>
        <div className={"form_tea_label"}>
        <label htmlFor="description">Description :</label> <textarea name="description" required id="description" onChange={handleChange}></textarea>
        </div>
        <div className={"form_tea_label"}>
        <label htmlFor="price">Prix :</label> <input type="number" name="price" required id="price" step=".01" min="0" onChange={handleChange}></input>
        </div>
        <div className={"form_tea_label"}>
        <label htmlFor="category">Catégorie  :</label> 

        <select name="category" id="category" required onChange={handleChange}>
            <option value="">Selectionnez...</option>
            {listeCategory.map((cat, i) => <option value={cat._id} key={i}>{cat.name}</option>)}
        </select>
        </div>

        <div className={"form-group"}>
                <label htmlFor="error-message" style={{color:"red"}}>{messageError}</label>
        </div>

        <button value="Ajouter" type="submit">Ajouter</button>
        </form>
        </div>
        </>
    )
}
export default AddTea;