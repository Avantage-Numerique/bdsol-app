
//Styling
import styles from './help.module.scss'

const Help = () => {
    return (
        <div className={`col-12 ${styles["help-menu"]}`}>
            <h2>Bienvenue dans l'espace utilisateur !</h2>
            <div>
                Tout d'abord, merci de tester la BDSOL.
                Vos commentaires nous aiderons à améliorer l'application pour la mettre à votre image!
            </div>
            <div>
                Un bouton nommé "<u>Partage d'idées</u>" se trouve sur la droite de votre écran. Il permet de prendre en image une partie de votre écran 
                et de surligner des éléments. Cette interface vous permettra d'écrire vos commentaires ainsi que de nous partager des éléments ou 
                fonctionnalités que vous aimeriez voir dans l'application.
            </div>
            <div>
                <h3>Pour facilité votre navigation</h3>
                <h4>Dans la barre, en haut de l'écran :</h4>
                <ul>
                    <li>- Le bouton <u>Avantage Numérique</u> vous ramènera à la page d'accueil.</li><br></br>
                    <li>- Un peu plus à droite, se trouve un <u>bouton rond de "profil"</u> permettant d'accéder à la page du compte, où vous vous trouvez présentement.</li><br></br>
                    <li>- Totalement à droite, le bouton fait de <u>3 lignes horizontales</u> vous ouvre un menu qui facilitera la navigation vers les autres pages.</li>
                </ul>
                <br></br>
                <h4>À droite de ce texte, sous votre photo de profil, les boutons bleu représentent le <u>Menu</u> du compte :</h4>
                <ul>
                    <li>- "<u>Aide</u>" : affiche ce texte de présentation</li><br></br>
                    <li>- "<u>Modifier mon profil</u>" : encore en construction, vous permettera dans le futur de modifier les informations de votre compte</li><br></br>
                    <li>- "<u>Historique de modification</u>" : affichera les modifications que vous avez apportées à la base de données (les ajouts, modifications ou suppression).</li><br></br>
                    <li>- "<u>Se déconnecter</u>" : vous l'aurez compris, permet de vous déconnecter. Cependant, vous trouverez aussi la possibilité de vous déconnecter dans le bouton profil au haut de la page</li>
                </ul>
                <br></br>
            </div>
        </div>
    )
}

export default Help