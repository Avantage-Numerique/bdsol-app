import {useCallback} from "react";
import PageHeader from "@/src/layouts/Header/PageHeader";
import {Breadcrumbs} from "@/src/common/Breadcrumbs/Breadcrumbs";
import {getLicencesData} from "@/src/api/external/callbacks/getLicencesData";
import {lang} from "@/common/Data/GlobalConstants";
import AppRoutes from "@/src/Routing/AppRoutes";
import PageMeta from "@/src/common/PageMeta/PageMeta";
import {appConfig} from "@/src/configs/AppConfig";
import {ExternalLink} from "@/common/Components/ExternalLink";
import {InPageLink} from "@/common/Components/InPageLink";


export async function getServerSideProps() {

    const licences = await getLicencesData();

    return {
        props: {
            licences: licences
        }, // will be passed to the page component as props
    }
}


const Licences = (props) => {

    const getLabelGenerator = useCallback((param, query) => {
        return {
            "faq": "FAQ",
            "licences": "Licences",
        }[param];
    }, []);

    const breadcrumbsLabels = {
        "faq": "FAQ",
        "licences": "Licences"
    }
    const pageSpacing = appConfig.spacing.pagesContentSpacing;

    return (
        <div className="content faq-licence-content">
            <PageMeta
                title={lang.faq__licences__title}
                description={lang.faq__licences__description}
            />
            <PageHeader title={lang.licencesSingleTitle}>
                <Breadcrumbs className={"pt-2"} route={AppRoutes.licences} labels={breadcrumbsLabels}
                             getLabelGenerator={getLabelGenerator}/>
            </PageHeader>
            <div className={pageSpacing}>
                <section id="faq-licence-definition" className={"row"}>
                    <div className={"col"}>
                        <h3>Qu'est-ce qu'une licence?</h3>
                        <p>
                            Une licence est l'ensemble des permissions et restrictions d'utilisation d'une oeuvre,
                            création ou idée accordée par l'auteur-trice de celle-ci.
                        </p>
                        <p>
                            Une licence affirme les permissions et restrictions d'utilisations d'une propriété
                            intellectuelle ou matérielle dans un cadre légal.
                            Elle permet à l'auteur-trice de conserver le crédit et la propriété intellectuelle de
                            l'Oeuvre tout en définissant les limites
                            d'utilisation par d'autre personne du fruit de son travail.

                            Les licences permettent, entre autres, de spécifier si l'on peut modifier l'Oeuvre,
                            l'utiliser de façon commerciale ou peut nous obliger à attribuer le crédit à l'auteur si on
                            l'utilise.
                        </p>
                        <hr/>
                    </div>
                </section>
                <section id="faq-licences-supportees" className={"row"}>
                    <div className={"col"}>
                        <h3>Licences supportées par {appConfig.name}</h3>
                        <h4>Les définitions suivantes sont des résumés.</h4>
                        <p>* Veuillez lire les définitions en vous dirigeant sur les liens avant toutes manipulations
                            d'oeuvre.</p>
                        <ul>
                            {props.licences ?
                                Object.keys(props.licences).map((licence, i) => {
                                    const current = props.licences[licence];
                                    return (
                                        <li className={"pb-3"} key={i}>
                                            <h4><InPageLink name={current.slug} /><ExternalLink href={current.source} title={current.label}>
                                                <img src={current.image} alt={current.name}
                                                     className={"pe-2"}/> {current.label}
                                            </ExternalLink></h4>
                                            {current.guide && current.guide !== "" &&
                                                <p dangerouslySetInnerHTML={{__html: current.guide}}></p>}
                                            {current.description && current.description !== "" &&
                                                <p dangerouslySetInnerHTML={{__html: current.description}}></p>}
                                        </li>
                                    )
                                })
                                :
                                <li>{lang.noLicenceData}</li>
                            }
                        </ul>
                        {!props.licences &&
                            <ul>
                                <li>
                                    <h4><InPageLink name={"CC0"} />
                                        <ExternalLink href="https://creativecommons.org/publicdomain/zero/1.0/deed.fr" title={"CC0"}>
                                            <img src="https://i.creativecommons.org/p/zero/1.0/88x31.png"
                                                 alt="Public domain image" className={"pe-2"}/>
                                            CC0 (Domaine public) :
                                        </ExternalLink>
                                    </h4>
                                    <p>
                                        L'Oeuvre fait partie du domaine public. Il n'y a aucun droits d'auteur.
                                        <br/>
                                        Vous pouvez copier, modifier, distribuer, représenter l'oeuvre, même à des fins
                                        commerciales, sans avoir besoin de demander l'autorisation.
                                    </p>
                                </li>
                                <li>
                                    <h4><InPageLink name={"CC-By"} />
                                        <ExternalLink href="https://creativecommons.org/licenses/by/4.0/deed.fr" title="CC-By">
                                            <img src="https://i.creativecommons.org/l/by/4.0/88x31.png" alt="By image"
                                                 className={"pe-2"}/>
                                            CC-By :
                                        </ExternalLink>
                                    </h4>
                                    <p>
                                        Permet le partage et la modification de l'oeuvre, y compris pour une utilisation
                                        commerciale.<br/>
                                        Vous devez créditer l'auteur-trice.
                                    </p>
                                </li>
                                <li>
                                    <h4><InPageLink name={"CC-By-SA"} />
                                        <ExternalLink href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr" title={"CC-By-SA"}>
                                            <img src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
                                                 alt="By-SA image" className={"pe-2"}/>
                                            CC-By-SA :
                                        </ExternalLink>
                                    </h4>
                                    <p>
                                        Permet le partage et la modification de l'oeuvre, y compris pour une utilisation
                                        commerciale.<br/>
                                        Vous devez créditer l'auteur-trice et si vous modifier l'oeuvre, vous devez la
                                        partager sous la même licence que l'originale.
                                    </p>
                                </li>
                                <li>
                                    <h4><InPageLink name={"CC-By-NC"} />
                                        <ExternalLink href="https://creativecommons.org/licenses/by-nc/4.0/deed.fr" title="CC-By-NC">
                                            <img src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png"
                                                 alt="By-NC image" className={"pe-2"}/>
                                            CC-By-NC :
                                        </ExternalLink>
                                    </h4>
                                    <p>
                                        Permet le partage et la modification de l'oeuvre.<br/>
                                        Vous devez créditer l'auteur-trice et ne pouvez pas utiliser l'oeuvre de façon
                                        commerciale.
                                    </p>
                                </li>
                                <li>
                                    <h4><InPageLink name={"CC-By-NC-SA"} />
                                        <ExternalLink href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr"
                                           title="CC-By-NC-SA">
                                            <img src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
                                                 alt="By-NC-SA image" className={"pe-2"}/>
                                            CC-By-NC-SA :
                                        </ExternalLink>
                                    </h4>
                                    <p>
                                        Permet le partage et la modification de l'oeuvre.<br/>
                                        Vous devez créditer l'auteur-trice, ne pouvez pas utiliser l'oeuvre de façon
                                        commerciale et devez partager l'oeuvre sous la même licence que l'originale.
                                    </p>
                                </li>
                                <li>
                                    <h4><InPageLink name={"CC-By-ND"} />
                                        <ExternalLink href="https://creativecommons.org/licenses/by-nd/4.0/deed.fr"
                                           title="CC-By-ND">
                                            <img src="https://i.creativecommons.org/l/by-nd/4.0/88x31.png"
                                                 alt="By-ND image" className={"pe-2"}/>
                                            CC-By-ND :
                                        </ExternalLink>
                                    </h4>
                                    <p>
                                        Permet seulement le partage, y compris pour une utilisation commerciale.<br/>
                                        Vous devez créditer l'auteur-trice. Vous ne pouvez pas modifier l'oeuvre. Si
                                        vous modifier l'oeuvre, vous n'êtes pas autorisé à la partager ou la distribuer.
                                    </p>
                                </li>
                                <li>
                                    <h4><InPageLink name={"CC-By-NC-ND"} />
                                        <ExternalLink href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr"
                                           title="CC-By-NC-ND">
                                            <img src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png"
                                                 alt="By-NC-ND image" className={"pe-2"}/>
                                            CC-By-NC-ND :
                                        </ExternalLink>
                                    </h4>
                                    <p>
                                        Permet seulement le partage.<br/>
                                        Vous devez créditer l'auteur-trice, ne pouvez pas utiliser l'oeuvre de façon
                                        commerciale et n'êtes pas autorisé à modifier l'oeuvre. Si vous modifier
                                        l'oeuvre, vous n'êtes pas autorisé à la partager ou la distribuer.
                                    </p>
                                </li>
                            </ul>
                        }
                        <hr/>
                    </div>
                </section>
                <section id="faq-licence-accronymes" className={"row pb-3"}>
                    <div className={"col"}>
                        <h3 className={"pb-3 pt-4 position-relative"}>Définition des accronymes utilisés <InPageLink name={"definitions-accronymes"} /></h3>
                        <ul>
                            <li>
                                <h4><InPageLink name={"domaine-public"} />
                                    {
                                        //Svg are from : Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.
                                    }
                                    <img src={"/icones/cc0.svg"} alt={"CC0"} className={"pe-2"}/>
                                    CC0 (Domaine public) :
                                </h4>
                                <p>Cette licence permet aux créateurs de renoncer à leurs droits d'auteur et de placer
                                    leurs
                                    œuvres dans le domaine public mondial. CC0 permet aux réutilisateurs de distribuer,
                                    remixer, adapter et développer le matériel sur n'importe quel support ou format,
                                    sans
                                    conditions.</p>
                            </li>
                            <li>
                                <h4><InPageLink name={"by"} />
                                    <img src={"/icones/cc-by.svg"} alt={"BY"} className={"pe-2"}/>
                                    By (Attribution) :
                                </h4>
                                <p>Vous devez créditer l'Oeuvre, intégrer un lien vers la licence et indiquer si des
                                    modifications ont été effectuées à l'Oeuvre. Vous devez indiquer ces informations
                                    par
                                    tous les moyens raisonnables, sans toutefois suggérer que le détenteur vous soutient
                                    ou
                                    soutient la façon dont vous avez utilisé son Oeuvre.</p>
                            </li>
                            <li>
                                <h4><InPageLink name={"sa"} />
                                    <img src={"/icones/cc-sa.svg"} alt={"SA"} className={"pe-2"}/>
                                    SA (Partage dans les mêmes conditions) :
                                </h4>
                                <p>Dans le cas où vous effectuez un remix, que vous transformez, ou créez à partir du
                                    matériel composant l'Oeuvre originale, vous devez diffuser l'Oeuvre modifiée dans
                                    les
                                    même conditions, c'est à dire avec la même licence avec laquelle l'Oeuvre originale
                                    a
                                    été diffusée.</p>
                            </li>
                            <li>
                                <h4><InPageLink name={"nc"} />
                                    <img src={"/icones/cc-nc.svg"} alt={"NC"} className={"pe-2"}/>
                                    NC (Pas d'utilisation commerciale) :
                                </h4>
                                <p>Vous n'êtes pas autorisé à faire un usage commercial de cette Oeuvre, tout ou partie
                                    du
                                    matériel la composant.</p>
                            </li>
                            <li>
                                <h4><InPageLink name={"nd"} />
                                    <img src={"/icones/cc-nd.svg"} alt={"ND"} className={"pe-2"}/>
                                    ND (Pas de modifications) :
                                </h4>
                                <p>Dans le cas où vous effectuez un remix, que vous transformez, ou créez à partir du
                                    matériel composant l'Oeuvre originale, vous n'êtes pas autorisé à distribuer ou
                                    mettre à
                                    disposition l'Oeuvre modifiée.</p>
                            </li>
                        </ul>

                        <blockquote className={"mt-5 py-3 px-4 bg-primary-lighter"}>Sources :
                            &nbsp;
                            <ExternalLink href="https://creativecommons.org/about/cclicenses/" title="creative commons (cc)">
                                <img src={"/icones/cc.svg"} alt={"CC"} className={"pe-2"}/>
                                creative commons (cc).
                            </ExternalLink>
                        </blockquote>
                    </div>
                </section>
            </div>

        </div>
    );
}

export default Licences