import { NavLink } from "react-router-dom";
import { useEffect,useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Tea = () => {
    const [listeCategory, setListCategory] = useState([]);
	const [listTea,setListTea] = useState([]);

	useEffect(() => {
		fetch('http://localhost:8080/category')
		  .then(
			response => response.json())
		  .then(res => {
			setListCategory(res);
		  });

		  fetch('http://localhost:8080/')
		  .then(
			response => response.json())
		  .then(res => {
			setListTea(res);
		  });
		  
	  }, []);

    return (
		<>
		<Header/>
        <main className={"container"}>
			{listeCategory.map((cat,i) =>
				<section className={"tea"} key={i}>
				<img src={"/img/tea/"+cat.image} alt={cat.nom}/>
				<h2><span>{cat.nom}</span></h2>
				<p className={"clear"}>{cat.description}</p>
				<section className={"listing-product"}>
					{listTea.filter(tea_filt=>tea_filt.category===cat._id).map((tea,indice) =>
		
					<article key={indice}>
					<h3>{tea.name}</h3>
					<img src={"/img/product/"+tea.image_big} alt={tea.name}/>
					<section className={"price"}>
						<p>À partir de <strong>{tea.price}€</strong></p>
					</section>
					<NavLink className={"btn"} to={tea._id}>Voir ce produit</NavLink>
				</article>
				
					)}
				</section>
			</section>
			)}
			
		</main>
		<Footer/>
		</>
    )

}

export default Tea;