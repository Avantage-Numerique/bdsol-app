//Context
import {useAuth} from '@/auth/context/auth-context'
import PageHeader from "@/layouts/Header/PageHeader";
import React from "react";

/**
 * Really basic page with plain text. This could be dry with an entry or some sort of markdown file.
 * @return {JSX.Element}
 * @constructor
 */
const Index = () => {

    //Import the authentication context
    const auth = useAuth();

    return (
        <div className={"page-apropos"}>
            <PageHeader title={`Qu'est-ce que la BDSOL`} description={"Premièrement c'est un accronyme pour : Base de données ouvertes et liées."} />


            <h2>Pourquoi on développe une base de données?</h2>
            <p>Maecenas sed enim ut sem. Elit duis tristique sollicitudin nibh sit amet commodo. Quisque id diam vel quam elementum pulvinar. At tellus at urna condimentum. Id velit ut tortor pretium viverra. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero id. Sagittis nisl rhoncus mattis rhoncus urna neque. Dui vivamus arcu felis bibendum ut tristique et. Nisl nunc mi ipsum faucibus vitae aliquet. Ante in nibh mauris cursus mattis molestie a iaculis. Hac habitasse platea dictumst quisque sagittis. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna.</p>
        </div>
    )

}

export default Index