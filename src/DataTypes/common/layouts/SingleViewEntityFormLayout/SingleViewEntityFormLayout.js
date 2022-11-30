
import PageHeader from "@/src/layouts/Header/PageHeader";
import React from "react";


const SingleViewEntityFormLayout = (props) => {

    const formName = props.formName;

    return (
        <div className={`contribution-${formName} pb-3 create-${formName}`}>
            <PageHeader {...props.headerProps} />

            <p className="fst-italic">Une taxonomie sert à classifier dans un système ordonné les relations entre les choses. Ajoutez ici une taxonomie pour permettre à une entité d'être relié à cette taxonomie. Par exemple, lier une <strong>personne</strong> à une <strong>occupation</strong> ou une <strong>aptitude</strong> et lier une <strong>organisation</strong> à une <strong>offre de service</strong> et bien d'autre.</p>

            <div className="bg-purplelighter pvy-2">
                <div className="row justify-content-center ma-classe">
                    <div className="col col-sm-8">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}
//this must be added into the uri js file.
//export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default SingleViewEntityFormLayout