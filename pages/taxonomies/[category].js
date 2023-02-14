import { Router } from 'next/router';
import TaxonomiesCategoryPage from '.';



const TaxonomiesOfCategoryPage = (props) => {
    //console.log("Router.query", window.location.pathname.split("/").pop())

    return (
        <div>
            <a href='/taxonomies'>Retour à la liste des taxonomies</a>
        </div>
    )
}
export default TaxonomiesOfCategoryPage;