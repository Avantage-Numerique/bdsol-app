
import PageHeader from "@/src/layouts/Header/PageHeader";
import React from "react";
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {lang} from "@/common/Data/GlobalConstants";


const SingleViewEntityFormLayout = (props) => {

    const formName = props.formName;

    return (
        <div className={`contribution-${formName} pb-3 create-${formName}`}>
            <PageHeader {...props.headerProps} />

            <SanitizedInnerHtml className="fst-italic pb-3" Wrapper="p" >
                {lang.taxonomyExplications}
            </SanitizedInnerHtml>

            <div className="container-fluid bg-purplelighter pvy-2">
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