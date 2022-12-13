import { NavLink } from "react-router-dom";
import { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
    const [listeCategory, setListCategory] = useState([]);
    const [nouveauTea, setNouveauTea] = useState([]);
	const [fallingTea, setFallingTea] = useState([]);
	const [bestTea, setBestTea] = useState([]);

	
  useEffect(() => {
    fetch('http://localhost:8080/category')
      .then(
        response => response.json())
      .then(res => {
        setListCategory(res);
      });

	  fetch('http://localhost:8080/newtea')
      .then(
        response => response.json())
      .then(res => {
		setNouveauTea(res[0]);
      });

	  fetch('http://localhost:8080/besttea')
      .then(
        response => response.json())
      .then(res => {
		setBestTea(res[0]);
      });

	  fetch('http://localhost:8080/falling')
      .then(
        response => response.json())
      .then(res => {
		setFallingTea(res[0]);
      });

     
    

  }, []);

    return (
		<>
		<Header/>
        <main className={"container"}>
			<section id="noel">
				<h1>C'est noël chez Cup of Tea, profitez-en !</h1>
				<img src={"img/offre-noel.jpg"} alt="Offre spéciale pour noel ! Dès 45€ d'achat, le photophore de noël vous sera offert. Et dès 85€ un thé vert au prune et coing de 100 gramme vous sera offert"/>
				<small>Pour toute commande effectuée avant le 20 décembre</small>
			</section>
			<section id="slider">
				<div className={"flexslider"}>
					<ul className={"slides"}>
						<li className={"flex-active-slide"} data-thumb-alt="" style={{width:"100%",float:"left",marginRight:"-100%",position:"relative",opacity:1,display:"block",zIndex:2}}><img src={"/img/slider/1.jpg"} alt="Retrouvez toute nos idées cadeaux pour les fêtes de noël" draggable="false"/></li>
						<li data-thumb-alt=""  style={{width:"100%",float:"left",marginRight:"-100%",position:"relative",opacity:0,display:"block",zIndex:1}} className={""}><img src={"/img/slider/2.jpg"} alt="Retrouvez toute la collection des thés numéro 25 et notre nouvelle édition limitée" draggable="false"/></li>
					</ul>
				<ol className={"flex-control-nav flex-control-paging"}><li><NavLink href="#" className={"flex-active"}>1</NavLink></li><li><NavLink href="#" className={""}>2</NavLink></li></ol><ul className={"flex-direction-nav"}><li className={"flex-nav-prev"}><NavLink className={"flex-prev"} href="#">Previous</NavLink></li><li className={"flex-nav-next"}><NavLink className={"flex-next"} href="#">Next</NavLink></li></ul></div>
			</section>
			<section id="categorie">
				<h2><span>Choisissez votre thé</span></h2>
                {listeCategory.map((cat, i) => <NavLink to={i} key={i}>
					<img src={"/img/tea/"+cat.image} alt={cat.name}/>
					<h3>{cat.name}</h3>
				</NavLink>)}
			
			</section>
			<section id="tea">
                <article id="new">
                        <h2><span>Notre nouveauté</span></h2>
                        <img src={"/img/product/"+nouveauTea.image_normal} alt={nouveauTea.name}/>
                        <h3>{nouveauTea.name}</h3>
                        <p>{nouveauTea.description}</p>
                        <section className={"price"}>
                            <p>À partir de <strong>{nouveauTea.price} €</strong></p>
                        </section>
                        <NavLink className={"btn"} to={"/tea/"+nouveauTea._id}>Voir ce produit</NavLink>
                    </article>
				<article id="best">
					<h2><span>Notre best-seller</span></h2>
					<img src={"/img/product/"+bestTea.image_normal} alt={bestTea.name}/>
					<h3>{bestTea.name}</h3>
                    <p>{bestTea.description}</p>
					<section className={"price"}>
					<p>À partir de <strong>{bestTea.price} €</strong></p>
					</section>
					<NavLink className={"btn"} to={"/tea/"+bestTea._id}>Voir ce produit</NavLink>
				</article>
				<article id="crush">
					<h2><span>Notre coup de coeur</span></h2>
					<img src={"/img/product/"+fallingTea.image_normal} alt={fallingTea.name}/>
                        <h3>{fallingTea.name}</h3>
                        <p>{fallingTea.description}</p>
                        <section className={"price"}>
                            <p>À partir de <strong>{fallingTea.price} €</strong></p>
                        </section>
                        <NavLink className={"btn"} to={"/tea/"+fallingTea._id}>Voir ce produit</NavLink>
				</article>
			</section>
		</main>
		<Footer/>
		</>
    )

}

export default Home;