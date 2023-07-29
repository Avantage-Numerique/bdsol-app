
//Styling
import styles from './help.module.scss'


//Help est la page d'aide de /compte pour guider les utilisateurs lors de leur première utilisation
const Help = () => {
    return (
        <div className={`${styles["help-menu"]}`}>
            <h3>Pour partager vos idées</h3>
            <p>
                Un bouton nommé "<strong>Partage d'idées</strong>" se trouve sur la droite de votre écran. Il permet de prendre en image une partie de votre écran 
                et de surligner des éléments. Cette interface vous permettra d'écrire vos commentaires ainsi que de nous partager des éléments ou 
                fonctionnalités que vous aimeriez voir dans l'application.
            </p>
            <h3>Pour faciliter votre navigation</h3>
            <h4>Dans la barre, en haut de l'écran :</h4>
            <ul>
                <li>Le bouton <strong>Avantage Numérique</strong> vous ramènera à la page d'accueil.</li>
                <li>Un peu plus à droite, se trouve un <strong>bouton rond de "profil"</strong> ou une <strong>image de profil</strong>, permettant d'accéder à la page du compte, où vous vous trouvez présentement.</li>
                <li>Totalement à droite, le bouton fait de <strong>3 lignes horizontales</strong> vous ouvre un menu qui facilitera la navigation vers les autres pages.</li>
            </ul>
            <h4>À gauche de ce texte, sous votre photo de profil, les boutons bleu représentent le Menu du compte :</h4>
            <ul>
                <li>"<strong>Aide</strong>" : Affiche ce texte de présentation</li>
                {/*<li>"<strong>Modifier mon profil</strong>" : Vous permet de modifier les informations de votre compte</li>*/}
                <li>"<strong>Historique de modification</strong>" : Affiche les modifications que vous avez apportées à la base de données (les ajouts, modifications ou suppressions).</li>
                <li>"<strong>Se déconnecter</strong>" : Permet de vous déconnecter. Cependant, vous trouverez aussi la possibilité de vous déconnecter dans le bouton profil au haut de la page</li>
            </ul>
        </div>
    )
}

export default Help