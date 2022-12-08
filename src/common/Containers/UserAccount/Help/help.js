
//Styling
import styles from './help.module.scss'


//Help est la page d'aide de /compte pour guider les utilisateurs lors de leur première utilisation
const Help = () => {
    return (
        <div className={`${styles["help-menu"]}`}>
            <h2>Tout d'abord, merci de tester la BDSOL.</h2>
            <p>
                Vos commentaires nous aiderons à améliorer l'application pour la mettre à votre image!
                C'est pour cela que nous vous fournissons un formulaire que vous pouvez remplir pour nous aider.
            </p>
            <p>
                <a href="https://form.jotform.com/222238272581253" className={"btn btn-outline-primary"} target="_blank">Consulter et remplir le formulaire</a>
            </p>
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
            <h4>À droite de ce texte, sous votre photo de profil, les boutons bleu représentent le Menu du compte :</h4>
            <ul>
                <li>"<strong>Aide</strong>" : affiche ce texte de présentation</li>
                <li>"<strong>Modifier mon profil</strong>" : encore en construction, vous permettera dans le futur de modifier les informations de votre compte</li>
                <li>"<strong>Historique de modification</strong>" : affichera les modifications que vous avez apportées à la base de données (les ajouts, modifications ou suppression).</li>
                <li>"<strong>Se déconnecter</strong>" : vous l'aurez compris, permet de vous déconnecter. Cependant, vous trouverez aussi la possibilité de vous déconnecter dans le bouton profil au haut de la page</li>
            </ul>
        </div>
    )
}

export default Help