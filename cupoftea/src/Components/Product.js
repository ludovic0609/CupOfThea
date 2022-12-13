import { NavLink, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import {addProduct} from "../actions/actions-types";
import Header from "./Header";
import Footer from "./Footer";



const Product = () => {
	
	const [listTea, setListTea] = useState([]);

	

	const {id} =useParams();
	
	const dispatch = useDispatch();
	const [listChoice,setListChoice]=useState("100");
	const url_fetch="http://localhost:8080/tea/"+id;
	
	useEffect(() => {
		
		fetch(url_fetch)
		  .then(
			response => response.json())
		  .then(res => {
			setListTea(res[0]);
			
	
		  });
	  },[] );
	  
	  const handleChange = (event)  => {
        event.preventDefault();
        const {name, value} = event.target;
		setListChoice(value);
 
} 	
const handleCard = (event)  => {
	event.preventDefault();
	dispatch(addProduct({listTea,listChoice}))
} 	
	  
    
    return (
       <>
	   <Header/>
        <main className={"container"}>
			<section id="product">
				<section id="product-detail">
					<div id="product-name">
						<h1>{listTea.name}</h1>
						<h2>{listTea.name}</h2>
						<p>Ref : {listTea.reference} </p>
					</div>
					<div id="rating">
						<i className={"gold fa fa-star"} aria-hidden="true"></i>
						<i className={"gold fa fa-star"} aria-hidden="true"></i>
						<i className={"gold fa fa-star"} aria-hidden="true"></i>
						<i className={"gold fa fa-star"} aria-hidden="true"></i>
						<i className={"fa fa-star"} aria-hidden="true"></i>
						<a href="#">Voir les 56 avis clients</a>
					</div>
				</section>
				<section id="product-quantity">
					<img src={"/img/product/"+listTea.image_big } alt=""/>
					<div className={"price"}>
						<select name="quantity" onChange={handleChange}>
							<option value="100">Pochette de 100gr</option>
							<option value="500">Pochette de 500gr</option>
							<option value="1000">Pochette de 1kg</option>
						</select>
						<h3> {listTea.price} €</h3>
						<NavLink className={"btn"} onClick={handleCard}>Ajouter au panier</NavLink>
						<a id="wishlist" href="#">Ajouter à ma liste d'envie</a>
					</div>
				</section>
				<section id="product-description">
					<p>{listTea.description} </p>
					<p><strong>Profitez d'une remise de 5% sur la pochette de 500g (prix déjà remisé).</strong></p>
					<p><strong>Profitez d'une remise de 10% sur le lot de 2 pochettes de 500g (prix déjà remisé).</strong></p>
				</section>
			</section>
		</main>
		<Footer/>
        </>
    )

}

export default Product;