import Head from 'next/head'

import ClassInfos from '../../../components/ClassInfos'

/*

    Component for individual class pages 

*/


//Specify dynamic routes to pre-render pages based on data.
export const getStaticPaths = async () => {

    const res = await fetch('https://mocki.io/v1/494789e7-8fce-45f1-bb79-f92bcef2d0d5');
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
    const res = await fetch('https://mocki.io/v1/494789e7-8fce-45f1-bb79-f92bcef2d0d5');
    const data = await res.json();

    //filter the array to get only the selected information
    const classe = data.classes.find((classe) => classe.slug === context.params.slug );

    //return the result as a props
    return{
        props: { data: classe, active: true, globalData: data }
    }
}


const ClassPage = ( {data, active, globalData} ) => {

    return (
        <div className="maxWidthPageContainer">
        {/* Set the proper width in the page */}

            <Head>
                <title>{`Classe ${data.title}`}</title>
            </Head>
            
            {/* Main informations component of the class */}
            <ClassInfos data={ data } active={ active } globalData={globalData}/>

        </div>
    );
}

export default ClassPage;