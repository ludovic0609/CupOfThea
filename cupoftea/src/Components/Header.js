import { NavLink } from "react-router-dom";
import Nav from "./Nav";
import {useSelector} from "react-redux";


const Header = (props) => {
    const classNameImg="ribbon";
    const classNameDiv="container";
	//recupere le prix total pour l'afficher dans le bandeau
	const { price_total } = useSelector(state => state);

    return (
        <>
        <header>
	
			<img className={classNameImg}  src={'/img/ribbon.svg'} alt="élu meilleur thé en 2016" />
			<section id="topbar">Livraison offerte à partir de 65€ d'achat !</section>
			<div className={classNameDiv}>
				<section id="logo">
					<NavLink to="/">
						<img src={"/img/logo.png"} alt="Logo de Cup of Tea" />
					</NavLink>
					
					<section id="cart">
					<NavLink to="/panier" style={{color:"white"}}><span>Mon panier </span> </NavLink>
					<strong> {price_total.toFixed(2)} € </strong>
					
					</section>
					
				</section>
				<Nav/>
			</div>
		</header>
        </>
    )

}
export default Header;