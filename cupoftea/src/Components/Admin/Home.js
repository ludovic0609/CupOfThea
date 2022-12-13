

import NavAdmin from "./Nav";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const Home = () => {

    const [listTea, setListTea] = useState([]);
    const [removeTea, setRemoveTea] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch('http://localhost:8080/all')
          .then(
            response => response.json())
          .then(res => {
            setListTea(res);
          });

      }, []);

      useEffect(() => {
        fetch('http://localhost:8080/all')
          .then(
            response => response.json())
          .then(res => {
            setListTea(res);
          });

      }, [removeTea]);


      const handleDelete = (event) =>{
        const id_tea=event;

        fetch('http://localhost:8080/tea/delete/'+id_tea, {
                method: "DELETE",
                headers: {
                    'Content-type': 'text/html'
                  },
                  body: ""
              })
              .then((response) => response.json())
              .then((result) => {

                if(result) setRemoveTea(true);
                
                
              })

    };
    
    return (
        <>
        <NavAdmin/>
        <table>
  <caption>Les différents Tea</caption>
  <thead>
    <tr>
    <th scope="col">Nom du thé</th>
      <th scope="col">Réference</th>
      <th scope="col">catégorie</th>
      <th scope="col">Prix</th>
      <th scope="col">Image</th>

      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {listTea.map((tea, i) => <tr key={i}>
  <td data-label="Name">{tea.name}</td>
      <td data-label="Ref">{tea.reference}</td>
      <td data-label="cat">{tea.category[0].name}</td>
      <td data-label="price">{tea.price.toFixed(2)} €</td>
      <td data-label="image"><img src={"/img/product/"+tea.image_big} width="80" height="80" alt={tea.name}/> </td>
      <td data-label="action"> <NavLink  to={"/admin/dashboard/update/tea/"+tea._id}><FaEdit/></NavLink> <NavLink  onClick={(e) =>{handleDelete(tea._id)}}><FaTrash/></NavLink></td>
    </tr>)}

    
  </tbody>
</table>
        </>
    )
}
export default Home;