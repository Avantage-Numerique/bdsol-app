//Styling
import styles from './help.module.scss'


//Help est la page d'aide de /compte pour guider les utilisateurs lors de leur première utilisation
const Help = () => {
    return (
        <div className={`${styles["help-menu"]}`}>
            <h3>Pour faciliter votre navigation</h3>
            <h4>Dans la section, en haut de l'écran :</h4>
            <ul>
                <li>Le logo <strong>Avantage Numérique</strong> vous ramènera à la page d'accueil.</li>
                <li>Au milieu se trouve une <strong>barre de recherche</strong>, permettant de rechercher des rapidement dans la base de donnée.</li>
                <li>Totalement à droite, le bouton fait de <strong>3 lignes horizontales</strong> vous ouvre un menu qui facilitera la navigation vers les différentes pages du site.</li>
            </ul>
            <h4>À gauche de ce texte, les boutons bleu représentent le Menu du compte :</h4>
            <ul>
                <li>"<strong>Mon compte</strong>" : Vous permet de modifier certains paramètres de votre compte.</li>
                <li>"<strong>Historique de modification</strong>" : Affiche les modifications que vous avez apportées à la base de données (les ajouts, modifications ou suppressions).</li>
                <li>"<strong>Aide</strong>" : Affiche ce texte d'aide.</li>
                <li>"<strong>Contribuer à la base de donnée</strong>" : Vous redirige vers la page de création d'entité.</li>
                <li>"<strong>Se déconnecter</strong>" : Permet de vous déconnecter à partir de cette page. Un autre bouton de déconnexion se trouve dans le bouton de navigation en haut à droite de la page en tout temps.</li>
            </ul>
        </div>
    )
}

export default Help