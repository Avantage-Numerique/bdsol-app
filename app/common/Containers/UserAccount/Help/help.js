
//Styling
import styles from './help.module.scss'


//Help est la page d'aide de /compte pour guider les utilisateurs lors de leur première utilisation
const Help = () => {
    return (
        <div className={`col-12 ${styles["help-menu"]}`}>
            <h2>Bienvenue dans l'espace utilisateur !</h2>
            <div>
                Tout d'abord, merci de tester la BDSOL.
                Vos commentaires nous aiderons à améliorer l'application pour la mettre à votre image!
                C'est pour cela que nous vous fournissons un formulaire que vous pouvez remplir pour nous aider.
                Voici le formulaire : <a href="https://form.jotform.com/222238272581253" target="_blank"><b><u>https://form.jotform.com/222238272581253.</u></b></a>
            </div>
            <br/>
            <div>
                Un bouton nommé "<b>Partage d'idées</b>" se trouve sur la droite de votre écran. Il permet de prendre en image une partie de votre écran 
                et de surligner des éléments. Cette interface vous permettra d'écrire vos commentaires ainsi que de nous partager des éléments ou 
                fonctionnalités que vous aimeriez voir dans l'application.
            </div>
            <div>
                <h3>Pour faciliter votre navigation</h3>
                <h4>Dans la barre, en haut de l'écran :</h4>
                <ul>
                    <li>Le bouton <b>Avantage Numérique</b> vous ramènera à la page d'accueil.</li><br></br>
                    <li>Un peu plus à droite, se trouve un <b>bouton rond de "profil"</b> permettant d'accéder à la page du compte, où vous vous trouvez présentement.</li><br></br>
                    <li>Totalement à droite, le bouton fait de <b>3 lignes horizontales</b> vous ouvre un menu qui facilitera la navigation vers les autres pages.</li>
                </ul>
                <br></br>
                <h4>À droite de ce texte, sous votre photo de profil, les boutons bleu représentent le Menu du compte :</h4>
                <ul>
                    <li>"<b>Aide</b>" : affiche ce texte de présentation</li><br></br>
                    <li>"<b>Modifier mon profil</b>" : encore en construction, vous permettera dans le futur de modifier les informations de votre compte</li><br></br>
                    <li>"<b>Historique de modification</b>" : affichera les modifications que vous avez apportées à la base de données (les ajouts, modifications ou suppression).</li><br></br>
                    <li>"<b>Se déconnecter</b>" : vous l'aurez compris, permet de vous déconnecter. Cependant, vous trouverez aussi la possibilité de vous déconnecter dans le bouton profil au haut de la page</li>
                </ul>
                <br></br>
            </div>
        </div>
    )
}

export default Help