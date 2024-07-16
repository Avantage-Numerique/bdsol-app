import React from "react";

//Component 
import CreateTaxonomyForm from '@/DataTypes/Taxonomy/components/Forms/CreateTaxonomy/CreateTaxonomyForm'
import PageHeader from "@/src/layouts/Header/PageHeader";
import Button from "@/src/common/FormElements/Button/Button"
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';


//Styling
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import {lang} from "@/src/common/Data/GlobalConstants";


const CreateTaxonomyPage = () => {

    const HeaderRightSection = () => {
        return (
            <div className="mt-4">
                <Button 
                    outline="secondary"
                    href="/contribuer"
                    size="slim"
                >
                    {lang.historyBack}
                </Button>
            </div>
        )
    }

    return (
        <>
            <PageHeader 
                title={"Catégorie"}
                subTitle="Ajouter une nouvelle catégorie pour classifier les données"
            >
                <HeaderRightSection />
            </PageHeader>
            <section className="container">
                <div className="row justify-content-center ">
                    <div className="col col-md-8 col-xl-7">            
                        <SanitizedInnerHtml 
                            className="fst-italic py-4" 
                            Wrapper="p" 
                            removeQlEditorClass
                        >
                            {lang.taxonomyExplications}
                        </SanitizedInnerHtml>
                        <CreateTaxonomyForm initValues={{}} />
                    </div>
                </div>
            </section>
        </>
    )
}

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default CreateTaxonomyPage