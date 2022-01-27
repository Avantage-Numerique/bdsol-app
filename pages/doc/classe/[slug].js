import Head from 'next/head'

import ClassInfos from '../../../components/ClassInfos'
import Config from '../../../components/Config'

import DOMPurify from 'isomorphic-dompurify';

/*
    Component for individual class pages
*/

//Specify dynamic routes to pre-render pages based on data.
export const getStaticPaths = async () => {

    const res = await fetch(Config.apiBaseHostName);
    const data = await res.json();

    

    //Map the parameters for every pages needed
    const paths = data.classes.map( classe => {
        return {
           params: { slug: classe.slug }
        }
    })

    //return the value of into the paths
    return {
        paths, 
        fallback: false
    }
    
}

//Fetch the data and pass it as a props
export const getStaticProps = async (context) => {

    //fetching
    const res = await fetch(Config.apiBaseHostName);
    const data = await res.json();

    //filter the array to get only the selected information
    const classe = data.classes.find((classe) => classe.slug === context.params.slug );

    //return the result as a props
    return{
        props: { data: classe, active: true, globalData: data }
    }
}


const ClassPage = ( {data, active, globalData} ) => {

    /****************************
             LD+Json data
     ****************************/
    const schema = {
        "@context": "http://schema.org/",
        "@type": "Dataset",
        name: data.title,
        description: data.intro,
        creator: {
          '@context': 'http://schema.org',
          '@type':'Organization',
          name: "Avantage Numérique",
          description: "Avantage numérique est un hub virtuel, physique et mobile qui dessert les secteurs de la culture, des affaires et du savoir. Il vise le développement de l’écosystème créatif, entrepreneurial et technologique du Croissant boréal.",
          mainEntityOfPage: "https://avantagenumerique.org/"
        },
    }

    return (
        <div className="maxWidthPageContainer">
        {/* Set the proper width in the page */}

            <Head>
                <title>{`Classe ${data.title}`}</title>

                {/* Keywords and description to evaluate */}
                <meta name="description" content={`Documentation spécifique à la classe ontologique ${data.title} et à ses propriétés.`} />
                <meta name="keywords" content={`classe, propriété, sous-classe, schema, avantage numérique, ${data.title}`} /> 

                {/* social media meta tag */}
                <meta property="og:title"              content={`Classe ${data.title} - Avantage Numérique`} />
                <meta property="og:description"        content={`Documentation spécifique à la classe ontologique ${data.title} et à ses propriétés.`} />

                <meta name="twitter:title"             content={`Classe ${data.title} - Avantage Numérique`}/>
                <meta name="twitter:description"       content={`Documentation spécifique à la classe ontologique ${data.title} et à ses propriétés.`}/>

                {/* 

                To add when the domain will be selected ....

                <link rel="canonical" href="https://avantagenumerique.org/">  

                */}

                {/* Structured data */}
                <script 
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(JSON.stringify(schema))}}
                />
                
            </Head>


            <h1>{data.title}</h1>
            
            {/* Main informations component of the class */}
            <ClassInfos data={ data } active={ active } globalData={globalData}/>

        </div>
    );
}

export default ClassPage;