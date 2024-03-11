import {appConfig} from "@/src/configs/AppConfig";
import PageHeader from "@/layouts/Header/PageHeader";
import React from "react";
import {RouteLink} from "@/common/Components/RouteLink";
import {lang} from "@/src/common/Data/GlobalConstants";
import Button from "@/FormElements/Button/Button";
import AppRoutes from "@/src/Routing/AppRoutes";
import PageMeta from "@/common/PageMeta/PageMeta";


const PolitiqueDutilisationDesDonnees = () => {

    const pageSpacing = appConfig.spacing.pagesContentSpacing;

    //Style setup in layouts/static

    /**
     * idée :
     * - Ajouter des tips sur les mots clés avec définitions défini en haut.
     * - Ajouter un Table des matière navigable.
     */
    return (
        <div className={"legal-page page-terms-of-use"}>
            <PageMeta 
                title={lang.privacy_policy__title}
                description={lang.privacy_policy__description}
            />
            <PageHeader
                bg={"bg-primary-lighter"}
                textColor={"text-white"}
                title={"Politique de confidentialité"}
                subTitle={"Dernière mise à jour : 2024-02-10 (version 2.0)"}
                description=""
                key={"confidentialPolicyPage"}
            />
            <section className={`container ${pageSpacing}`}>
                <div className="row">
                    <div className={"col"}>
                        <p>La Troupe de Théâtre « Les Zybrides », personne morale sans but lucratif (« la Troupe », « notre », « nous ») prend votre vie privée et la protection de vos Renseignements personnels au sérieux. Afin de protéger vos Renseignements personnels, nous avons mis en place des politiques, pratiques et procédures relatives à la gestion des Renseignements personnels que nous détenons. Les politiques et procédures internes encadrent la collecte, l’utilisation, la communication, la conservation et la destruction des renseignements personnels, ainsi que le traitement des plaintes, la sécurité de l’information et la gouvernance des données chez La Troupe. Elles fournissent également le cadre de la mise en œuvre des évaluations des facteurs relatifs à la vie privée, lorsqu’elles sont nécessaires, de même que la prévention et la réponse aux potentiels incidents de confidentialité. Toutes ces politiques et pratiques ont été approuvées par notre Responsable de la protection des renseignements personnels. La collecte de vos Renseignements personnels par le biais de notre Plateforme respecte les exigences de ce programme.</p>
                        <p>La présente Politique de confidentialité (la « Politique ») décrit spécifiquement nos pratiques en matière de protection des Renseignements personnels, les types de Renseignements personnels que nous pouvons recevoir ou recueillir auprès de vous et la manière dont nous les utilisons, les divulguons, les hébergeons et les sécurisons, afin que vous soyez en mesure de faire des choix judicieux et informés.</p>
                        <p>La présente Politique s’applique à notre plateforme web disponible à l’adresse <RouteLink routeName={"app"} /> (notre « Plateforme »). Toutefois, nous souhaitons attirer votre attention sur le fait que les droits et obligations décrits dans cette Politique ne couvrent pas les sites web tiers qui peuvent être liés ou mentionnés sur notre Plateforme. Ces sites web tiers ont leur propre politique de confidentialité et nous vous encourageons à les lire attentivement.</p>
                    </div>
                </div>
    
                <div className="row">
                    <div className={"col"}>
                        <h2>1. Renseignements personnels</h2>
                        <p>Aux fins de cette Politique, « Renseignement(s) personnel(s) » désigne toute information concernant une personne identifiable, incluant les renseignements qui peuvent être utilisés seuls ou avec d’autres informations pour identifier, contacter ou localiser une seule personne. En général, les Renseignements personnels ne comprennent pas les coordonnées d’affaires, telles que votre nom, votre titre ou vos coordonnées professionnelles.</p>
                    </div>
                </div>

                <div className="row">
                    <div className={"col"}>
                        <h2>2. Quels sont les renseignements personnels que nous recueillons?</h2>
                        <p>La Troupe doit recueillir et traiter certains de vos Renseignements personnels afin que vous puissiez utiliser notre Plateforme.</p>
                        <p>Lorsque nous collectons vos Renseignements personnels, nous nous assurons de ne recueillir que l’information nécessaire à la réalisation de l’un de nos objectifs, qui vous aura été préalablement divulgué, par exemple dans cette Politique. Nous utilisons les Renseignements personnels conformément aux lois de protection de la vie privée qui s’appliquent à nos activités.</p>
                        <h3>Les Renseignements personnels que nous recueillons peuvent inclure, <br/>mais ne sont pas limités à :</h3>
                        <ul>
                            <li><strong>Des renseignements liés à la création de votre compte et l’utilisation de la Plateforme :</strong><br/>
                                Vos coordonnées telles que votre nom, prénom ou adresse électronique, afin de vous identifier et de correspondre avec vous ;</li>
                            <li><strong>Des renseignements liés à l’utilisation de la Plateforme :</strong><br/>
                                Vos informations de connexion et d’utilisation de la Plateforme telles que la date de votre inscription à la Plateforme, votre nom d’utilisateur, votre adresse électronique, votre mot de passe, la date et heure des visites, données de géolocalisation (avec votre consentement), durée de la présence sur la Plateforme, pages cliquées et adresse IP de connexion, le contenu soumis ou vos interactions avec d’autres utilisateurs;</li>
                            <li><strong>Des renseignements vous concernant et apparaissant sur la Plateforme :</strong><br/>
                                Vos informations biographiques et professionnelles telles que votre poste, votre organisation, votre employeur, vos activités professionnelles, votre emplacement géographique (territoire et municipalité), votre biographie, des liens vers des sites externes ou réseaux sociaux vous mentionnant, vos informations démographiques telles que votre âge;</li>
                            <li><strong>Des renseignements relatifs à l’utilisation de vos appareils :</strong><br/>
                                par exemple le type d’appareil, l’identifiant unique, l’adresse IP, le système d’exploitation et l’emplacement physique de l’appareil (géolocalisation, localisation par balise) ainsi que les identifiants mobiles tels que les IDFA d’Apple ou les identifiants AAID de Google Android, le cas échéant ;</li>
                            <li><strong>Des renseignements pour nos communications :</strong><br/>
                                par exemple, des informations de marketing et vos préférences de communication, de même que vos commentaires; et</li>
                            <li>Tout autre Renseignement personnel que vous nous avez fourni.</li>
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className={"col"}>
                        <h2>3. Comment recueillons-nous vos renseignements personnels?</h2>
                        <h3>Directement auprès de vous</h3>
                        <p>En règle générale, nous recueillons les Renseignements personnels dont nous avons besoin directement auprès de vous, par exemple lorsque vous remplissez le formulaire d’inscription de la Plateforme ou lorsque vous communiquez avec nous. Nous pouvons également recueillir des renseignements relatifs à votre utilisation de la Plateforme, incluant des renseignements techniques sur vos visites, la durée moyenne de la visite, l’action effectuée sur la Plateforme, le type d’appareil utilisé ou toute autre information recueillie par le biais de cookies. Pour plus d’informations à cet égard, nous vous invitons à lire la section « Comment utilisons-nous les cookies ? ».</p>

                        <h3>Avec votre consentement</h3>
                        <p>Nous recueillons généralement vos Renseignements personnels avec votre consentement, à moins que la loi applicable ne prévoie une dérogation à ce principe (par exemple, pour nous conformer à nos obligations légales, lorsque cela est nécessaire pour établir, exercer ou défendre une action en justice ou une procédure judiciaire).</p>

                        <h3>Par un utilisateur de la Plateforme</h3>
                        <p>Sous réserve d’avoir reçu de votre part les consentements nécessaires, un utilisateur de la Plateforme peut fournir vos Renseignements personnels dans une Entité.</p>

                        <h3>Autre base légale permise, comme la réalisation de nos contrats</h3>
                        <p>Comme le permettent les lois sur la protection de la vie privée qui lui sont applicables, La Troupe pourrait collecter des Renseignements personnels sans votre consentement explicite par exemple pour nous conformer aux obligations des lois applicables ou pour réaliser nos contrats.</p>

                        <h3>Refus de la collecte et du retrait de votre consentement</h3>
                        <p>Vous avez le droit, si vous le souhaitez, de refuser le traitement de vos Renseignements personnels. Vous pouvez également, à tout moment, et sous réserve d’un préavis raisonnable et des restrictions légales ou contractuelles applicables, retirer votre consentement (le cas échéant) au traitement de vos Renseignements personnels en notre possession en nous contactant.</p>
                        <p>À titre d’utilisateur de la Plateforme, vous devez cependant savoir que, si vous choisissez de ne pas nous fournir vos Renseignements personnels, cela peut vous empêcher, par exemple, d’utiliser la Plateforme, car certains de ces renseignements sont essentiels à cette utilisation. Si un Utilisateur a fourni à sur la Plateforme des Renseignements personnels vous concernant, vous pouvez en tout temps nous contacter pour demander le retrait de ces informations.</p>
                        <p>Vous pouvez nous contacter comme indiqué dans la section « Comment nous contacter ? » pour toute question relative à ce sujet.</p>
                    </div>
                </div>

                <div className="row">
                    <div className={"col"}>
                        <h2>4. Pourquoi recueillons-nous vos renseignements personnels ?</h2>
                        <h3>Pour des fins spécifiques et limitées</h3>

                        <strong>La Troupe recueille généralement vos Renseignements personnels pour :</strong>
                        <ul>
                            <li>Établir et gérer notre relation avec vous ;</li>
                            <li>Fournir et maintenir les services demandés, à savoir l’accès à la Plateforme ;</li>
                            <li>Réaliser des études sur l’utilisation de la Plateforme, notamment à des fins statistiques ;</li>
                            <li>Améliorer la Plateforme et votre expérience en tant que membre ou utilisateur ;</li>
                            <li>Pour remplir nos objectifs, tels que le développement de nouveaux produits et services, l’amélioration ou la modification de nos produits et services ;</li>
                            <li>Pour vous envoyer des informations administratives, par exemple, des informations concernant nos services et des modifications de nos termes, conditions et politiques;</li>
                            <li>Répondre à vos demandes d’information, questions, requêtes, commentaires ou plaintes ;</li>
                            <li>Répondre à vos demandes d’assistance ;</li>
                            <li>Pour des fins d’analyse de données incluant l’identification des tendances d’utilisation, et pour déterminer l’efficacité de nos campagnes promotionnelles et activités;</li>
                            <li>Permettre le développement d’affaires et des activités de marketing, notamment en informant les utilisateurs actuels et futurs de nos nouvelles offres ou pour vous envoyer des communications marketing qui, selon nous, pourraient vous intéresser, tels des bulletins d’information, des courriels promotionnels uniques, des publipostages, des contacts commerciaux ou des infolettres;</li>
                            <li>Pour des fins d’audits, de surveillance et de prévention des fraudes ;</li>
                            <li>Pour respecter toute loi ou tout règlement applicables, ou pour agir en vertu de ceux-ci, incluant notamment, sans s’y limiter : (i) répondre aux demandes des autorités publiques et gouvernementales, y compris les autorités publiques et gouvernementales en dehors de votre pays de résidence ; (ii) pour protéger nos opérations et intérêts légitimes ou ceux de nos filiales ; (iii) pour nous permettre de poursuivre les recours disponibles ou de limiter les dommages que nous pourrions subir, etc. ;</li>
                            <li>Pour surveiller votre utilisation de la Plateforme de manière générale, pour prévenir son utilisation abusive, pour identifier des problèmes ou des bogues dans la Plateforme et pour déterminer les fonctionnalités à améliorer;</li>
                            <li>Pour faciliter et améliorer l’utilisation de notre Plateforme, tant que les Renseignements collectés sont utilisés proportionnellement à cette Fin ;</li>
                            <li>Pour toute autre fin à laquelle vous aurez consenti.<br/>
                            (collectivement, les « Fins »).</li>
                        </ul>

                        <h3>Pour vous envoyer des messages</h3>
                        <p>Si vous avez consenti à recevoir de telles informations, la Troupe peut vous envoyer des infolettres, des messages électroniques tels que des courriels, des nouvelles, des mises à jour et/ou d’autres communications écrites (les « Messages ») au sujet des services de la Troupe et/ou des produits et/ou services de ses partenaires. Vous pouvez choisir de ne pas recevoir les Messages de la manière indiquée dans la section « Contactez-nous » ou par le biais du lien de désabonnement inclus dans les Messages. Toutefois, la Troupe pourra continuer de vous envoyer des Messages pour vous informer des mises à niveau disponibles, des problèmes techniques critiques liés à la Plateforme, ou pour vous fournir des renseignements importants sur votre compte (le cas échéant).</p>
                        <h3>À des fins secondaires</h3>
                        <p>Selon les circonstances, la Troupe peut également agréger et anonymiser les Renseignements personnels que vous avez fournis, afin de créer des données statistiques que la Troupe pourrait utiliser à des fins secondaires, pour améliorer la Plateforme, examiner les tendances, développer la connaissance concernant le développement des territoires, répondre aux demandes statistiques de certains de nos partenaires ou développer des algorithmes d’apprentissage automatique. Ces données statistiques ne comprennent pas de Renseignements personnels.</p>
                    </div>
                </div>

                <div className="row">
                    <div className={"col"}>
                        <h2>5. Comment partageons-nous ou divulguons-nous vos renseignements personnels ?</h2>
                        <h3>Vos Renseignements personnels ne seront pas vendus à des tiers.</h3>

                        <p>Nous partageons vos Renseignements personnels à des tiers pour (i) l’atteinte de nos objectifs, (ii) répondre à des exigences ou demandes faites en vertu des lois applicables, (iii) remplir les tâches qui nous sont confiées par contrat par nos clients.</p>

                        <p>La plupart du temps, vous avez déjà consenti à un tel partage, par exemple en acceptant le consentement qui vous est présenté lors de l’ouverture de votre compte. Parfois les lois applicables nous autorisent aussi à partager vos Renseignements personnels à des tiers sans votre consentement, dans des cas spécifiques.</p>

                        <p>Plus concrètement, nous pourrions devoir partager vos Renseignements personnels, parfois sans votre consentement :</p>

                        <h3>Avec nos employés</h3>

                        <p>Dans le cadre de leur travail, nos employés peuvent avoir besoin d’accéder à vos Renseignements personnels, par exemple, lorsque vous nous contactez ou demandez de l’aide. Leur accès est limité à ce qui est nécessaire à l’exercice de leurs fonctions.</p>

                        <p>Avec des fournisseurs de services et partenaires stratégiques</p>

                        <p>Nos partenaires stratégiques et fournisseurs de services doivent parfois avoir accès ou recevoir certains Renseignements personnels pour l’accomplissement de leurs services (hébergeur de données infonuagique, maintenance, analyse, détection des fraudes et développement) pour une durée limitée dans le cadre de ces activités. Dans un tel cas, nous mettons en œuvre des mesures de protection contractuelles et techniques raisonnables, incluant des Évaluations des facteurs relatifs à la vie privée, pour que ces tiers gardent strictement confidentiels tous les Renseignements personnels qu’ils traitent.
                        Veuillez noter que ces tiers peuvent être situés ailleurs que dans votre pays, province ou territoire de résidence. Pour plus d’informations à ce sujet, veuillez consulter la section « À quel endroit sont hébergés et transférés vos Renseignements personnels ? ».</p>

                        <h3>Lorsque les lois applicables l’exigent</h3>

                        <p>Nous pouvons également partager vos Renseignements personnels si la loi l’exige ou si nous pensons de bonne foi qu’une telle action est nécessaire pour : (i) nous conformer à la loi ; (ii) nous conformer à l’ordonnance d’une autorité judiciaire compétente dans toute juridiction ; (iii) nous conformer à une procédure judiciaire signifiée à la Troupe  ; (iv) protéger et défendre les droits ou la propriété de la Troupe  ; (v) faire respecter ou vérifier votre conformité à toute entente que vous avez conclue avec la Troupe, le cas échéant ; (vi) prévenir la fraude ou toute autre activité illégale perpétrée par le biais de la Plateforme ; ou (vii) agir dans des circonstances urgentes pour protéger la sécurité personnelle des utilisateurs de la Plateforme ou du public en général.</p>

                        <h3>Lors d’une transaction commerciale</h3>

                        <p>Nous pouvons partager vos Renseignements personnels sans votre consentement lorsque nos transactions commerciales l’exigent. Dans de telles circonstances, nous pouvons également partager tout ou partie de vos Renseignements personnels avec le tiers concerné (ou ses conseillers) aux fins d’un processus de vérification diligente.</p>

                        <h3>À d’autres fins, avec votre consentement</h3>

                        <p>Lorsque vous y avez expressément consenti, vos Renseignements personnels peuvent être partagés avec d’autres tierces parties. Par exemple, il peut y avoir des cas spécifiques où des conditions supplémentaires s’appliquent et à travers celles-ci, nous indiquons clairement que des tiers spécifiques traitent vos Renseignements personnels.</p>

                    </div>
                </div>

                <div className="row">
                    <div className={"col"}>
                        <h2>7. À quel endroit sont hébergés et transférés vos renseignements personnels ?</h2>
                        <p>Vos Renseignements personnels peuvent être conservés par la Troupe dans des régions autres que votre province, territoire ou pays de résidence, incluant au Canada, aux États-Unis et dans la province de Québec. La Troupe peut également sous-traiter le traitement ou partager vos Renseignements personnels avec des tiers situés ailleurs, dans des régions autres que votre province, territoire ou pays de résidence. Dans ce cas, nous nous efforçons de limiter l’accès aux Renseignements personnels à ces tiers à ce qui est nécessaire pour accomplir les tâches qui leur sont confiées.</p>
                        <p>Sachez que nous avons des ententes contractuelles avec ces tiers et fournisseurs pour nous assurer que vos Renseignements personnels sont traités conformément aux lois qui nous sont applicables. Lorsque cela est applicable, nous procédons aux Évaluations des facteurs relatifs à la vie privée avant un transfert de Renseignements personnels vers une autre juridiction, par exemple à l’extérieur du Québec</p>
                        <p>Ceci peut inclure la mise en œuvre de mesures de sécurité robustes et efficaces. De plus, la Troupe s’assurera que vos Renseignements personnels soient protégés de manière adéquate par des moyens techniques, organisationnels ou autres moyens légaux appropriés. Si vous souhaitez obtenir plus de renseignements sur ces mesures de sécurité, veuillez nous contacter comme indiqué dans la section « Comment nous contacter ? ».</p>
                    </div>
                </div>

                <div className="row">
                    <div className={"col"}>
                        <h2>8. Combien de temps conservons-nous vos renseignements personnels ?</h2>
                        <p>La Troupe ne conservera vos Renseignements personnels que pour la durée requise pour atteindre les fins pour lesquelles ils ont été collectés, conformément à nos politiques internes de rétention des documents, pour se conformer aux exigences légales, fiscales ou réglementaires applicables, jusqu’à ce que vous nous demandiez de les détruire ou, sauf exception, pour une durée de sept (7) ans. Après une telle période, tout Renseignement personnel concerné et détenu par La Troupe sera détruit, supprimé ou anonymisé.</p>
                        <p>Pour déterminer la période de conservation appropriée de vos Renseignements personnels, nous tenons compte de la quantité, de la nature et de la sensibilité des Renseignements personnels, du risque potentiel de préjudice découlant d’une utilisation ou d’une divulgation non autorisée de vos Renseignements personnels, des Fins pour lesquelles nous traitons vos Renseignements personnels et de la possibilité d’atteindre ces Fins par d’autres moyens, ainsi que des exigences juridiques, réglementaires, fiscales, comptables ou autres applicables. Si vous souhaitez obtenir plus de renseignements à ce sujet, nous vous invitons à nous contacter.</p>
                    </div>
                </div>

                <div className="row">
                    <div className={"col"}>
                        <h2>9. Comment protégeons-nous vos renseignements personnnels ?</h2>

                        <h3>Avec des mesures nécessaires et appropriées</h3>
                        <p>La sécurité de vos Renseignements personnels est une priorité pour nous.</p>
                        <p>Vos Renseignements personnels sont hébergés par nos fournisseurs de services qui s’engagent envers nous à utiliser des mesures de sécurité raisonnables afin de préserver l’intégrité et la confidentialité de vos Renseignements personnels.</p>
                        <p>Nos employés et fournisseurs sont informés du caractère confidentiel des Renseignements personnels recueillis et sont sensibilisés aux mesures de sécurité appropriées pour éviter un accès non autorisé à des Renseignements personnels.</p>
                        <p>Nous maintenons notre service et toutes les données associées avec des mesures de protection techniques, administratives et physiques pour vous protéger contre la perte, l’accès non autorisé, la destruction, l’utilisation abusive, la modification et la divulgation inappropriée de vos Renseignements personnels. Ces mesures de protection varient selon la sensibilité des données en notre possession et s’inspirent des meilleurs standards de l’industrie. Malheureusement, aucun système de transmission de données ou de stockage ne peut être garanti à 100 %.</p>
                        <p>Si vous avez des questions sur la sécurité de votre interaction avec nous (si, par exemple, vous estimez que la sécurité de tout compte que vous pourriez avoir avec nous a été compromise), vous pouvez nous contacter comme indiqué dans la section « Comment nous contacter ? ».</p>

                        <h3>La vie privée des enfants</h3>
                        <p>Compte tenu de l’importance de la protection de la vie privée des enfants, nous ne destinons pas la Plateforme à un public mineur. La nature de nos services et de notre Plateforme pourrait cependant toucher des mineurs, par exemple une Entité concerne des personnes d’âge mineur.</p>
                        <p>Dans les cas où La Troupe pourrait collecter des renseignements personnels de mineurs, nous exigerons le consentement explicite du titulaire de l’autorité parentale, du tuteur ou du mineur de 14 ans et plus, selon le cas applicable.</p>
                        <p>Si un parent ou un tuteur découvre que son enfant mineur nous a fourni des Renseignements personnels sans que nous n’ayons obtenu le consentement approprié, ce parent ou ce tuteur a le droit, sur demande, de consulter les Renseignements personnels fournis par l’enfant et/ou d’exiger qu’ils soient supprimés de nos dossiers. Dans ce cas, nous demandons au parent ou au tuteur de l’enfant de nous contacter aux coordonnées indiquées dans la section « Comment nous contacter ? ».</p>

                    </div>
                </div>

                <div className="row">
                    <div className={"col"} id="usage-cookies">
                        <h2>10. Comment utilisons-nous les cookies ?</h2>

                        <p>Un cookie est un petit fichier texte qui est stocké dans un emplacement dédié sur votre ordinateur, appareil mobile, tablette ou autre appareil lorsque vous utilisez votre navigateur pour visiter un service en ligne. D’autres technologies de suivi, telles que les balises web et les pixels de suivi, peuvent être utilisées à des fins similaires. Dans la présente Politique, toutes ces technologies de suivi sont collectivement désignées par le terme « Cookie(s) ». Tout Renseignement personnel recueilli à l’aide de Cookies par la Troupe ou en son nom (le cas échéant) est traité avec le même niveau de confidentialité que tout autre Renseignement personnel détenu par la Troupe.</p>

                        <h3>Cookies strictement nécessaires</h3>
                        <p>Ces Cookies sont nécessaires au fonctionnement de la Plateforme et ne peuvent pas être désactivés dans nos systèmes. Les Cookies strictement nécessaires doivent être présents afin que la Plateforme puisse assurer les fonctions de base et peuvent inclure la connexion, l’ajout de formations et autres services à un panier ou à la facturation électronique. Ils permettent à un utilisateur de naviguer d’une page à l’autre sans perdre ses actions précédentes dans la même session.</p>

                        <h3>Cookies non essentiels</h3>
                        <p>Si vous avez consenti à leur utilisation, la Troupe et/ou ses tiers partenaires peuvent également utiliser des Cookies non essentiels en relation avec la Plateforme, notamment les suivants :</p>
                        <ul>
                            <li>Cookies de fonctionnalité (également connus sous le nom de « Cookies de préférence ») : Ces Cookies ne sont pas essentiels à la prestation de nos services. Ils permettent de personnaliser et d’améliorer l’expérience utilisateur. À titre d’exemple, si vous avez consenti à leur utilisation, ces Cookies conserveront vos préférences de communication.</li>
                            <li>Cookies de performance (également appelés « Cookies statistiques » ou « Cookies analytiques ») : Ces Cookies ne sont pas essentiels à la prestation de nos services. Si vous avez consenti à leur utilisation, nous utilisons des Cookies de performance pour comprendre comment vous interagissez avec notre Plateforme, pour produire des rapports de localisation et pour avoir des rapports d’analyse sur les erreurs de la Plateforme. Nos partenaires peuvent également utiliser ce type de Cookies pour analyser votre utilisation de notre Plateforme et nous fournir des informations à ce sujet. Ces Cookies sont uniquement destinés à des fins statistiques.</li>
                        </ul>

                        <h3>Désactivation des Cookies auxquels vous avez consenti</h3>
                        <p>À l’exception des Cookies strictement nécessaires, nous ne placerons de Cookies sur votre appareil que si vous y consentez, et ces Cookies seront conservés pendant une période maximale de 13 mois à partir du moment où ils sont installés sur votre appareil. À la fin de cette période, votre consentement sera à nouveau requis. Vous pouvez également gérer vos Cookies en modifiant les paramètres de votre navigateur ou de votre appareil. Pour plus de détails sur la façon de configurer votre navigateur, veuillez consulter le centre d’aide de Chrome, Safari, Firefox, Internet Explorer, Edge ou Opera. Toutefois, si vous choisissez de refuser les Cookies, certaines pages ou sections de notre Plateforme pourraient ne pas s’afficher correctement ou certaines fonctionnalités pourraient ne plus être disponibles.</p>
                        <Button outline={"secondary"} href={AppRoutes.paramsCookies.asPath}>Changer vos paramètres de cookies</Button>
                    </div>
                </div>

                <div className="row">
                    <div className={"col"}>
                        <h2>11. Quels sont vos droits ?</h2>

                        <p>Selon les lois applicables, l’endroit où vous vous demeurez et la manière dont vous interagissez avec la Plateforme, certains droits peuvent vous être octroyés concernant les Renseignements personnels que nous détenons à votre sujet</p>
                        <p>Par exemple, vous pourriez avoir le droit :</p>
                        <ul>
                            <li>D’obtenir accès aux Renseignements personnels que nous détenons à votre sujet ;</li>
                            <li>De corriger les Renseignements personnels que nous détenons et qui sont inexacts, équivoques ou incomplets ;</li>
                            <li>D’exiger la suppression de vos Renseignements personnels ;</li>
                            <li>D’obtenir de l’information supplémentaire, par exemple sur les catégories de tiers à qui nous communiquons vos Renseignements personnels ;</li>
                            <li>De vous opposer au traitement de vos Renseignements personnels effectué sur la base de nos intérêts légitimes et nous demander de restreindre le traitement de vos informations personnelles ;</li>
                            <li>De requérir la portabilité de vos Renseignements personnels dans un format structuré, couramment utilisé et lisible par machine ;</li>
                            <li>De retirer votre consentement à tout moment, si nous avons collecté et traité vos Renseignements personnels avec votre consentement. Le retrait de votre consentement n’affectera pas la légalité du traitement que nous avons effectué avant votre retrait, ni le traitement de vos informations personnelles effectué sur la base de motifs de traitement légitimes autres que le consentement.</li>
                            <li>De refuser les communications promotionnelles transmises par La Troupe ;</li>
                            <li>De porter plainte auprès d’une autorité de contrôle en protection des renseignements personnels, par exemple auprès d’un commissaire à la vie privée ou de la Commission d’accès à l’information</li>
                        </ul>
                        <h3>Porter plainte</h3>
                        <p>Vous pouvez déposer une plainte auprès du Responsable de la protection des renseignements personnels de La Troupe si vous n’êtes pas satisfait de notre gestion de vos Renseignements personnels ou du respect de cette Politique.</p>
                        <p>Il vous est également permis par la loi de porter plainte auprès d’un commissaire à la vie privée ou de toute autre autorité de contrôle compétente en protection des renseignements personnels.</p>

                        <h3>Exercer vos droits</h3>
                        <p>Vous pouvez vous-même réviser, corriger, mettre à jour, modifier ou supprimer les Renseignements personnels que vous nous avez fournis en utilisant votre compte. Il suffit de vous connecter à votre compte et de procéder aux modifications.</p>
                        <p>Vous pouvez aussi exercer vos droits énumérés ci-dessus en effectuant une demande écrite à notre Responsable de la protection des Renseignements personnels en le contant comme indiqué dans la section « Comment nous contacter ? ». Ce dernier pourra vous aider dans vos démarches, si vous en avez besoin.</p>
                        <p>Pour votre protection, nous ne traiterons que les demandes d’exercice des droits provenant de la même adresse courriel que celle que vous utilisez pour vous connecter à votre compte. Nous pourrions aussi avoir besoin de vérifier votre identité avant de traiter votre demande. Selon les lois applicables, nous vous informerons de la procédure à suivre, du délai de traitement et des informations requises, le cas échéant. Nous tentons de donner suite aux demandes rapidement, habituellement dans un délai de 30 jours.</p>
                        <p>Dans le cadre des activités de traitement couvertes par la présente Politique, La Troupe ne prend pas de décisions fondées uniquement sur un traitement automatisé produisant des effets juridiques ou des effets significatifs similaires.</p>
                    </div>
                </div>

                <div className="row">
                    <div className={"col"}>
                        <h2>12. Vos choix concernant notre utilisation et la divulgation des renseignements personnels</h2>
                        <p>Les Renseignements que vous fournissez peuvent être utilisés par La Troupe à des fins de marketing, y compris, mais sans s’y limiter, des courriels promotionnels uniques, des publipostages et des contacts commerciaux. Nous vous proposons plusieurs choix concernant notre utilisation et divulgation de vos Renseignements personnels en matière de marketing, de données de localisation, de Cookies ou de publicité en ligne. Vous pouvez désactiver:</p>
                        <ul>
                            <li>Nos communications électroniques à des fins de marketing : Vous pouvez refuser de recevoir ces courriels en envoyant une demande de suppression de la liste à partir de l’Adresse courriel listée dans la section « Comment nous contacter ? ». Vous pouvez vous désinscrire de nos listes d’envoi électroniques en tout temps. Si vous en faites la demande, nous n’utiliserons pas vos coordonnées à des fins marketing par la suite. Veuillez noter que nous pouvons néanmoins vous envoyer des messages à des fins administratives ou directement liées à votre utilisation de la Plateforme, et vous ne pouvez pas refuser de recevoir ces messages sans cesser de l’utiliser.</li>
                            <li>Certaines données de localisation : Si celles-ci sont collectées, vous pouvez désactiver l’utilisation de certaines données de localisation sur votre appareil, par exemple en désactivant les services de localisation de votre système dans les paramètres de confidentialité de votre système d’exploitation. Nous pouvons également conserver des données d’utilisation telles que la date et l’heure auxquelles l’application sur votre appareil accède à nos serveurs.</li>
                            <li>Les cookies non essentiels : Vous pouvez désactiver ces Cookies selon la procédure mentionnée dans la section « Comment utilisons nous les cookies ? ».</li>
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className={"col"}>
                        <h2>13. Comment nous contacter ?</h2>
                        <p>Si vous avez des questions sur tout aspect de la présente Politique, si vous souhaitez envoyer un commentaire, déposer une plainte ou exercer l’un des droits mis à votre disposition conformément aux lois applicables, veuillez le faire par le biais du lien « Contactez-nous » sur la Plateforme, lorsqu’il est disponible, ou veuillez contacter notre Responsable de la protection des renseignements personnels comme suit :</p>

                        <h3>Responsable de la protection des renseignements personnels</h3>
                        <ul>
                            <li>Adresse : {appConfig.legal.address}</li>
                            <li>Courriel : {appConfig.legal.email}</li>
                            <li>No. de téléphone : {appConfig.legal.phone}</li>
                        </ul>

                        <p>Votre demande pourra être acceptée ou refusée par la Troupe selon les lois applicables. La Troupe prendra rapidement des mesures correctives lorsqu’elle aura connaissance de tout manquement à cette Politique. La Troupe ne peut être tenu responsable de tout dommage indirect, accessoire, consécutif ou punitif lié à cette Politique. Vous pouvez à tout moment déposer une plainte auprès de l’autorité compétente si vous pensez que la Troupe ne traite pas vos Renseignements personnels de manière conforme à la présente Politique ou aux lois applicables.</p>
                        <p>Pour toute question liée à un problème technique de la Plateforme quant à votre accès ou à l’utilisation des fonctionnalités de celui-ci, nous vous invitons à communiquer avec nous via l’adresse suivante : {appConfig.support.email}</p>
                    </div>
                </div>

                <div className="row">
                    <div className={"col"}>
                        <h2>14. Modifications et mises à jour de la politique</h2>
                        <p>Nous révisons la Politique de temps à autre pour nous conformer aux lois applicables et respecter nos opérations. Si nous mettons à jour cette Politique de façon significative, nous vous avertirons en vous envoyant un avis soit sur la Plateforme ou par courriel. Toutefois, dans toute autre circonstance, la publication d’une nouvelle version de la Politique sur la Plateforme ou votre utilisation continue de la Plateforme suffira en termes d’avis et de consentement aux modifications de la Politique.</p>
                    </div>
                </div>

            </section>

        </div>
    )
}

export default PolitiqueDutilisationDesDonnees;