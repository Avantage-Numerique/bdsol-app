
//Component 
import CreateTaxonomyForm from '../../../DataTypes/Taxonomy/Components/Forms/CreateTaxonomy/CreateTaxonomyForm'
import Button from '../../../app/common/FormElements/Buttons/Button/Button'

//Styling 
import styles from './createTaxonomy.module.scss'
import {withSessionSsr} from "../../../authentication/session/handlers/withSession";
import {ssrCanAccess} from "../../../authentication/permissions/ssrCanAccess";
import PageHeader from "../../../app/layouts/Header/PageHeader";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SingleViewEntityFormLayout
    from "../../../DataTypes/common/layouts/SingleViewEntityFormLayout/SingleViewEntityFormLayout";
import {lang} from "../../../app/common/Data/GlobalConstants";


const CreateTaxonomyPage = () => {

    return (
        <SingleViewEntityFormLayout formName={"taxonomy"} headerProps={{
            title: "Taxonomie",
            subTitle: "Ajouter une nouvelle pour classifier les données",
            colWidth: 8,
            historyBack: {
                uri: "/contribuer",
                label: lang.historyBack
            }
        }}>
            <CreateTaxonomyForm />
        </SingleViewEntityFormLayout>
    )
}

export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default CreateTaxonomyPage