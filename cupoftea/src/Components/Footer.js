import { NavLink } from "react-router-dom";

const Footer = () => {
    
    return (
        <>
        <footer>
			<section id="info">
				<article>
					<i className={"fa fa-lock"}></i>
					<small>Paiement sécurisé</small>
				</article>
				<article>
					<i className={"fa fa-truck"}></i>
					<small>Ma livraison offerte</small>
				</article>
				<article>
					<i className={"fa fa-money"}></i>
					<small>Carte de fidélité</small>
				</article>
				<article>
					<i className={"fa fa-phone"}></i>
					<small>Service client</small>
				</article>
				<article>
					<i className={"fa fa-check-circle"}></i>
					<small>Garantie qualité</small>
				</article>
			</section>
			<section id="bottombar">
				<article>
					<h2>Cup of Tea</h2>
					<ul>
						<li>Notre histoire</li>
		    			<li>Nos boutiques</li>
		    			<li>Le Thé de A à Z</li>
		    			<li>Espace clients professionnels</li>
		    			<li>Recrutement</li>
		    			<li>Contactez-nous !</li>
		    			<li>L'École du Thé</li>
					</ul>
				</article>
				<article>
					<h2>Commandez en ligne</h2>
					<ul>
						<li>Première visite</li>
		    			<li>Aide - FAQ</li>
		    			<li>Service client</li>
		    			<li>Suivre ma commande</li>
		    			<li>Conditions générales de vente</li>
		    			<li>Informations légales</li>
					</ul>
				</article>
				<article>
					<h2>Suivez-nous !</h2>
					<ul>
						<li>Notre histoire</li>
		    			<li>Nos boutiques</li>
		    			<li>Le Thé de A à Z</li>
		    			<li>Espace clients professionnels</li>
					</ul>
				</article>
			</section>
			<small id="licence">
            <NavLink rel="license" href="https://3wa.fr/propriete-materiel-pedagogique/"><img alt="Propriété de la 3W Academy" style={{borderWidth:0}} src="https://3wa.fr/wp-content/themes/3wa2015/img/logos/big.png"/></NavLink>
					<br/><span>Cet exercice</span> de <NavLink href="https://3wa.fr">3W Academy</NavLink>
					  est mis à disposition  <NavLink rel="license" href="https://3wa.fr/propriete-materiel-pedagogique/">
						pour l'usage personnel des étudiants, Pas de Rediffusion - Attribution - Pas d'Utilisation Commerciale - Pas de Modification - International</NavLink>.
						Les autorisations au-delà du champ de cette licence peuvent être obtenues auprès de <NavLink href="mailto:contact@3wa.fr" rel="cc:morePermissions">contact@3wa.fr</NavLink>. Les maquettes ont été réalisées par <NavLink href="http://www.justine-muller.fr">Justine Muller</NavLink>.
			</small>
		</footer>
        </>
    )
}
export default Footer;