import Head from 'next/head'

import ClassInfos from '@/documentation/components/ClassInfos/ClassInfos'

import DOMPurify from 'isomorphic-dompurify';

/*
    Component for individual class pages
*/

//Specify dynamic routes to pre-render pages based on data.
/*export const getStaticPaths = async () => {

    const data = {
        "classes": [{
            "slug": "person",
            "title": "Persons",
            "intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis vehicula enim, sed commodo nunc.",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis vehicula enim, sed commodo nunc. Ut vel ante aliquam felis facilisis varius vel a magna. Donec scelerisque augue non nisi vehicula, et tristique urna imperdiet. Aenean sit amet sollicitudin magna, eu ultrices justo. Fusce posuere augue sit amet odio imperdiet, in lobortis eros congue. Phasellus neque orci, vulputate a sollicitudin et, suscipit vel leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris id sem eros.",
            "properties": [{
                "slug": "propriete-01",
                "title": "Propriété 01",
                "source": "foaf",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fringilla scelerisque est, in tempus mi pellentesque ut. Aliquam tellus tortor, blandit a ipsum nec, ultricies fringilla neque. Sed semper est massa, ut aliquam nisl egestas et. Vestibulum venenatis justo eu iaculis dictum. Sed quis volutpat augue. Sed varius eleifend nisl eget vulputate. Nam ac velit erat. Cras vestibulum elit at lorem luctus hendrerit. Curabitur egestas mi metus, eu hendrerit erat mattis non. Vestibulum id laoreet leo, sed dictum libero. Vestibulum mauris augue, sagittis vitae varius vitae, sagittis vel justo.",
                "uses": "long texte about the use cases and exemple.",
                "restrictions": "Detail about it\'s restrictions.",
                "required": false
            }, {
                "slug": "propriete-02",
                "title": "Propriété 02",
                "source": "foaf",
                "description": "Praesent nec quam dignissim, pretium odio ut, ullamcorper purus. Vestibulum ultricies eros dolor, ut viverra eros dignissim nec. Fusce sapien nunc, consequat vitae semper sed, commodo quis lectus. Vestibulum ullamcorper dolor dolor. Suspendisse potenti. Phasellus eget convallis sem. Sed nisl libero, commodo et lectus eu, sagittis porttitor ipsum. Phasellus vel pulvinar lorem. Vestibulum rhoncus lacus nulla, at congue metus dictum eu. Nam interdum, neque hendrerit semper interdum, tellus orci semper metus, tristique placerat urna tellus at elit. Praesent vitae dolor tortor. Pellentesque tempor, mauris sit amet commodo vestibulum, dui enim cursus tellus, vel dignissim est ante convallis quam. Vestibulum egestas eros eget dui ultrices, id ullamcorper nulla cursus.",
                "uses": "long texte about the use cases and exemple.",
                "restrictions": "Detail about it\'s restrictions.",
                "required": false
            }],
            "linkedClasses": [{"class": "projet", "link": "part_of", "source": "schema.org"}, {
                "class": "team",
                "link": "part_of",
                "source": "schema.org"
            }, {"class": "equipment", "link": "own", "source": "schema.org"}]
        }, {
            "slug": "projet",
            "title": "Projets",
            "intro": "Proin et tincidunt leo. In pharetra, sapien eget sollicitudin maximus, mi tellus lacinia felis, at porta lorem massa vel ligula",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis vehicula enim, sed commodo nunc. Ut vel ante aliquam felis facilisis varius vel a magna. Donec scelerisque augue non nisi vehicula, et tristique urna imperdiet. Aenean sit amet sollicitudin magna, eu ultrices justo. Fusce posuere augue sit amet odio imperdiet, in lobortis eros congue. Phasellus neque orci, vulputate a sollicitudin et, suscipit vel leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris id sem eros.",
            "properties": [{
                "slug": "propriete-01",
                "title": "Propriété 01",
                "source": "foaf",
                "description": "Morbi vitae mauris eu arcu viverra iaculis. Sed ut vehicula augue. Nam enim tellus, dictum at mauris et, ornare euismod mi. Ut pharetra, diam vel aliquam pellentesque, elit ex aliquam purus, ut rhoncus nisi felis quis magna. Nam consequat quam ipsum, sit amet ornare dolor vestibulum non. Nunc tellus quam, cursus porta mattis vel, condimentum in quam. Duis lorem felis, gravida non gravida eu, tincidunt a mauris. Pellentesque id sollicitudin elit. Duis convallis quis eros ac ullamcorper. Morbi in finibus leo, eget rutrum urna. Praesent faucibus orci nec velit dignissim, sed vestibulum massa porta. Fusce eget purus diam. Nulla luctus nisl id est molestie, at porta velit luctus. Sed sodales convallis bibendum. Cras vehicula est porttitor ipsum viverra blandit. Cras porttitor gravida nisi, in semper odio euismod eget.",
                "uses": "long texte about the use cases and exemple.",
                "restrictions": "Detail about it\'s restrictions.",
                "required": false
            }, {
                "slug": "propriete-02",
                "title": "Propriété 02",
                "source": "foaf",
                "description": "Sed vitae eros et eros pharetra pellentesque nec in lacus. Praesent mollis est ac eros euismod condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui neque, tincidunt sit amet nibh id, euismod finibus metus. In volutpat nisi in lorem congue blandit. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed porta dictum eros, at ullamcorper risus. Aliquam eu velit a lectus elementum convallis.",
                "uses": "long texte about the use cases and exemple.",
                "restrictions": "Detail about it\'s restrictions.",
                "required": false
            }],
            "linkedClasses": [{"class": "person", "link": "part_of", "source": "schema.org"}, {
                "class": "team",
                "link": "part_of",
                "source": "schema.org"
            }, {"class": "equipment", "link": "own", "source": "schema.org"}]
        }, {
            "slug": "team",
            "title": "Équipe",
            "intro": "Proin et tincidunt leo. In pharetra, sapien eget sollicitudin maximus, mi tellus lacinia felis, at porta lorem massa vel ligula",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis vehicula enim, sed commodo nunc. Ut vel ante aliquam felis facilisis varius vel a magna. Donec scelerisque augue non nisi vehicula, et tristique urna imperdiet. Aenean sit amet sollicitudin magna, eu ultrices justo. Fusce posuere augue sit amet odio imperdiet, in lobortis eros congue. Phasellus neque orci, vulputate a sollicitudin et, suscipit vel leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris id sem eros.",
            "properties": [{
                "slug": "propriete-01",
                "title": "Propriété 01",
                "source": "foaf",
                "description": "Morbi vitae mauris eu arcu viverra iaculis. Sed ut vehicula augue. Nam enim tellus, dictum at mauris et, ornare euismod mi. Ut pharetra, diam vel aliquam pellentesque, elit ex aliquam purus, ut rhoncus nisi felis quis magna. Nam consequat quam ipsum, sit amet ornare dolor vestibulum non. Nunc tellus quam, cursus porta mattis vel, condimentum in quam. Duis lorem felis, gravida non gravida eu, tincidunt a mauris. Pellentesque id sollicitudin elit. Duis convallis quis eros ac ullamcorper. Morbi in finibus leo, eget rutrum urna. Praesent faucibus orci nec velit dignissim, sed vestibulum massa porta. Fusce eget purus diam. Nulla luctus nisl id est molestie, at porta velit luctus. Sed sodales convallis bibendum. Cras vehicula est porttitor ipsum viverra blandit. Cras porttitor gravida nisi, in semper odio euismod eget.",
                "uses": "long texte about the use cases and exemple.",
                "restrictions": "Detail about it\'s restrictions.",
                "required": false
            }, {
                "slug": "propriete-02",
                "title": "Propriété 02",
                "source": "foaf",
                "description": "Sed vitae eros et eros pharetra pellentesque nec in lacus. Praesent mollis est ac eros euismod condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui neque, tincidunt sit amet nibh id, euismod finibus metus. In volutpat nisi in lorem congue blandit. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed porta dictum eros, at ullamcorper risus. Aliquam eu velit a lectus elementum convallis.",
                "uses": "long texte about the use cases and exemple.",
                "restrictions": "Detail about it\'s restrictions.",
                "required": false
            }],
            "linkedClasses": [{"class": "person", "link": "part_of", "source": "schema.org"}, {
                "class": "projet",
                "link": "part_of",
                "source": "schema.org"
            }, {"class": "equipment", "link": "own", "source": "schema.org"}]
        }, {
            "slug": "equipement",
            "title": "Équipement",
            "intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis vehicula enim, sed commodo nunc.",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis vehicula enim, sed commodo nunc. Ut vel ante aliquam felis facilisis varius vel a magna. Donec scelerisque augue non nisi vehicula, et tristique urna imperdiet. Aenean sit amet sollicitudin magna, eu ultrices justo. Fusce posuere augue sit amet odio imperdiet, in lobortis eros congue. Phasellus neque orci, vulputate a sollicitudin et, suscipit vel leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris id sem eros.",
            "properties": [{
                "slug": "propriete-01",
                "title": "Propriété 01",
                "source": "foaf",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fringilla scelerisque est, in tempus mi pellentesque ut. Aliquam tellus tortor, blandit a ipsum nec, ultricies fringilla neque. Sed semper est massa, ut aliquam nisl egestas et. Vestibulum venenatis justo eu iaculis dictum. Sed quis volutpat augue. Sed varius eleifend nisl eget vulputate. Nam ac velit erat. Cras vestibulum elit at lorem luctus hendrerit. Curabitur egestas mi metus, eu hendrerit erat mattis non. Vestibulum id laoreet leo, sed dictum libero. Vestibulum mauris augue, sagittis vitae varius vitae, sagittis vel justo.",
                "uses": "long texte about the use cases and exemple.",
                "restrictions": "Detail about it\'s restrictions.",
                "required": false
            }, {
                "slug": "propriete-02",
                "title": "Propriété 02",
                "source": "foaf",
                "description": "Praesent nec quam dignissim, pretium odio ut, ullamcorper purus. Vestibulum ultricies eros dolor, ut viverra eros dignissim nec. Fusce sapien nunc, consequat vitae semper sed, commodo quis lectus. Vestibulum ullamcorper dolor dolor. Suspendisse potenti. Phasellus eget convallis sem. Sed nisl libero, commodo et lectus eu, sagittis porttitor ipsum. Phasellus vel pulvinar lorem. Vestibulum rhoncus lacus nulla, at congue metus dictum eu. Nam interdum, neque hendrerit semper interdum, tellus orci semper metus, tristique placerat urna tellus at elit. Praesent vitae dolor tortor. Pellentesque tempor, mauris sit amet commodo vestibulum, dui enim cursus tellus, vel dignissim est ante convallis quam. Vestibulum egestas eros eget dui ultrices, id ullamcorper nulla cursus.",
                "uses": "long texte about the use cases and exemple.",
                "restrictions": "Detail about it\'s restrictions.",
                "required": false
            }],
            "linkedClasses": [{"class": "person", "link": "part_of", "source": "schema.org"}, {
                "class": "projet",
                "link": "part_of",
                "source": "schema.org"
            }, {"class": "team", "link": "own", "source": "schema.org"}]
        }]
    };

    //Map the parameters for every pages needed
    const paths = data.classes.map(classe => {
        return {
            params: {slug: classe.slug}
        }
    })

    //return the value of into the paths
    return {
        paths,
        fallback: false
    }

}*/

//Fetch the data and pass it as a props
export const getServerSideProps = async (context) => {

    const data = {
        "classes": [{
            "slug": "person",
            "title": "Persons",
            "intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis vehicula enim, sed commodo nunc.",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis vehicula enim, sed commodo nunc. Ut vel ante aliquam felis facilisis varius vel a magna. Donec scelerisque augue non nisi vehicula, et tristique urna imperdiet. Aenean sit amet sollicitudin magna, eu ultrices justo. Fusce posuere augue sit amet odio imperdiet, in lobortis eros congue. Phasellus neque orci, vulputate a sollicitudin et, suscipit vel leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris id sem eros.",
            "properties": [{
                "slug": "propriete-01",
                "title": "Propriété 01",
                "source": "foaf",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fringilla scelerisque est, in tempus mi pellentesque ut. Aliquam tellus tortor, blandit a ipsum nec, ultricies fringilla neque. Sed semper est massa, ut aliquam nisl egestas et. Vestibulum venenatis justo eu iaculis dictum. Sed quis volutpat augue. Sed varius eleifend nisl eget vulputate. Nam ac velit erat. Cras vestibulum elit at lorem luctus hendrerit. Curabitur egestas mi metus, eu hendrerit erat mattis non. Vestibulum id laoreet leo, sed dictum libero. Vestibulum mauris augue, sagittis vitae varius vitae, sagittis vel justo.",
                "uses": "long texte about the use cases and exemple.",
                "restrictions": "Detail about it\'s restrictions.",
                "required": false
            }, {
                "slug": "propriete-02",
                "title": "Propriété 02",
                "source": "foaf",
                "description": "Praesent nec quam dignissim, pretium odio ut, ullamcorper purus. Vestibulum ultricies eros dolor, ut viverra eros dignissim nec. Fusce sapien nunc, consequat vitae semper sed, commodo quis lectus. Vestibulum ullamcorper dolor dolor. Suspendisse potenti. Phasellus eget convallis sem. Sed nisl libero, commodo et lectus eu, sagittis porttitor ipsum. Phasellus vel pulvinar lorem. Vestibulum rhoncus lacus nulla, at congue metus dictum eu. Nam interdum, neque hendrerit semper interdum, tellus orci semper metus, tristique placerat urna tellus at elit. Praesent vitae dolor tortor. Pellentesque tempor, mauris sit amet commodo vestibulum, dui enim cursus tellus, vel dignissim est ante convallis quam. Vestibulum egestas eros eget dui ultrices, id ullamcorper nulla cursus.",
                "uses": "long texte about the use cases and exemple.",
                "restrictions": "Detail about it\'s restrictions.",
                "required": false
            }],
            "linkedClasses": [{"class": "projet", "link": "part_of", "source": "schema.org"}, {
                "class": "team",
                "link": "part_of",
                "source": "schema.org"
            }, {"class": "equipment", "link": "own", "source": "schema.org"}]
        }, {
            "slug": "projet",
            "title": "Projets",
            "intro": "Proin et tincidunt leo. In pharetra, sapien eget sollicitudin maximus, mi tellus lacinia felis, at porta lorem massa vel ligula",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis vehicula enim, sed commodo nunc. Ut vel ante aliquam felis facilisis varius vel a magna. Donec scelerisque augue non nisi vehicula, et tristique urna imperdiet. Aenean sit amet sollicitudin magna, eu ultrices justo. Fusce posuere augue sit amet odio imperdiet, in lobortis eros congue. Phasellus neque orci, vulputate a sollicitudin et, suscipit vel leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris id sem eros.",
            "properties": [{
                "slug": "propriete-01",
                "title": "Propriété 01",
                "source": "foaf",
                "description": "Morbi vitae mauris eu arcu viverra iaculis. Sed ut vehicula augue. Nam enim tellus, dictum at mauris et, ornare euismod mi. Ut pharetra, diam vel aliquam pellentesque, elit ex aliquam purus, ut rhoncus nisi felis quis magna. Nam consequat quam ipsum, sit amet ornare dolor vestibulum non. Nunc tellus quam, cursus porta mattis vel, condimentum in quam. Duis lorem felis, gravida non gravida eu, tincidunt a mauris. Pellentesque id sollicitudin elit. Duis convallis quis eros ac ullamcorper. Morbi in finibus leo, eget rutrum urna. Praesent faucibus orci nec velit dignissim, sed vestibulum massa porta. Fusce eget purus diam. Nulla luctus nisl id est molestie, at porta velit luctus. Sed sodales convallis bibendum. Cras vehicula est porttitor ipsum viverra blandit. Cras porttitor gravida nisi, in semper odio euismod eget.",
                "uses": "long texte about the use cases and exemple.",
                "restrictions": "Detail about it\'s restrictions.",
                "required": false
            }, {
                "slug": "propriete-02",
                "title": "Propriété 02",
                "source": "foaf",
                "description": "Sed vitae eros et eros pharetra pellentesque nec in lacus. Praesent mollis est ac eros euismod condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui neque, tincidunt sit amet nibh id, euismod finibus metus. In volutpat nisi in lorem congue blandit. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed porta dictum eros, at ullamcorper risus. Aliquam eu velit a lectus elementum convallis.",
                "uses": "long texte about the use cases and exemple.",
                "restrictions": "Detail about it\'s restrictions.",
                "required": false
            }],
            "linkedClasses": [{"class": "person", "link": "part_of", "source": "schema.org"}, {
                "class": "team",
                "link": "part_of",
                "source": "schema.org"
            }, {"class": "equipment", "link": "own", "source": "schema.org"}]
        }, {
            "slug": "team",
            "title": "Équipe",
            "intro": "Proin et tincidunt leo. In pharetra, sapien eget sollicitudin maximus, mi tellus lacinia felis, at porta lorem massa vel ligula",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis vehicula enim, sed commodo nunc. Ut vel ante aliquam felis facilisis varius vel a magna. Donec scelerisque augue non nisi vehicula, et tristique urna imperdiet. Aenean sit amet sollicitudin magna, eu ultrices justo. Fusce posuere augue sit amet odio imperdiet, in lobortis eros congue. Phasellus neque orci, vulputate a sollicitudin et, suscipit vel leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris id sem eros.",
            "properties": [{
                "slug": "propriete-01",
                "title": "Propriété 01",
                "source": "foaf",
                "description": "Morbi vitae mauris eu arcu viverra iaculis. Sed ut vehicula augue. Nam enim tellus, dictum at mauris et, ornare euismod mi. Ut pharetra, diam vel aliquam pellentesque, elit ex aliquam purus, ut rhoncus nisi felis quis magna. Nam consequat quam ipsum, sit amet ornare dolor vestibulum non. Nunc tellus quam, cursus porta mattis vel, condimentum in quam. Duis lorem felis, gravida non gravida eu, tincidunt a mauris. Pellentesque id sollicitudin elit. Duis convallis quis eros ac ullamcorper. Morbi in finibus leo, eget rutrum urna. Praesent faucibus orci nec velit dignissim, sed vestibulum massa porta. Fusce eget purus diam. Nulla luctus nisl id est molestie, at porta velit luctus. Sed sodales convallis bibendum. Cras vehicula est porttitor ipsum viverra blandit. Cras porttitor gravida nisi, in semper odio euismod eget.",
                "uses": "long texte about the use cases and exemple.",
                "restrictions": "Detail about it\'s restrictions.",
                "required": false
            }, {
                "slug": "propriete-02",
                "title": "Propriété 02",
                "source": "foaf",
                "description": "Sed vitae eros et eros pharetra pellentesque nec in lacus. Praesent mollis est ac eros euismod condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui neque, tincidunt sit amet nibh id, euismod finibus metus. In volutpat nisi in lorem congue blandit. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed porta dictum eros, at ullamcorper risus. Aliquam eu velit a lectus elementum convallis.",
                "uses": "long texte about the use cases and exemple.",
                "restrictions": "Detail about it\'s restrictions.",
                "required": false
            }],
            "linkedClasses": [{"class": "person", "link": "part_of", "source": "schema.org"}, {
                "class": "projet",
                "link": "part_of",
                "source": "schema.org"
            }, {"class": "equipment", "link": "own", "source": "schema.org"}]
        }, {
            "slug": "equipement",
            "title": "Équipement",
            "intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis vehicula enim, sed commodo nunc.",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis vehicula enim, sed commodo nunc. Ut vel ante aliquam felis facilisis varius vel a magna. Donec scelerisque augue non nisi vehicula, et tristique urna imperdiet. Aenean sit amet sollicitudin magna, eu ultrices justo. Fusce posuere augue sit amet odio imperdiet, in lobortis eros congue. Phasellus neque orci, vulputate a sollicitudin et, suscipit vel leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris id sem eros.",
            "properties": [{
                "slug": "propriete-01",
                "title": "Propriété 01",
                "source": "foaf",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fringilla scelerisque est, in tempus mi pellentesque ut. Aliquam tellus tortor, blandit a ipsum nec, ultricies fringilla neque. Sed semper est massa, ut aliquam nisl egestas et. Vestibulum venenatis justo eu iaculis dictum. Sed quis volutpat augue. Sed varius eleifend nisl eget vulputate. Nam ac velit erat. Cras vestibulum elit at lorem luctus hendrerit. Curabitur egestas mi metus, eu hendrerit erat mattis non. Vestibulum id laoreet leo, sed dictum libero. Vestibulum mauris augue, sagittis vitae varius vitae, sagittis vel justo.",
                "uses": "long texte about the use cases and exemple.",
                "restrictions": "Detail about it\'s restrictions.",
                "required": false
            }, {
                "slug": "propriete-02",
                "title": "Propriété 02",
                "source": "foaf",
                "description": "Praesent nec quam dignissim, pretium odio ut, ullamcorper purus. Vestibulum ultricies eros dolor, ut viverra eros dignissim nec. Fusce sapien nunc, consequat vitae semper sed, commodo quis lectus. Vestibulum ullamcorper dolor dolor. Suspendisse potenti. Phasellus eget convallis sem. Sed nisl libero, commodo et lectus eu, sagittis porttitor ipsum. Phasellus vel pulvinar lorem. Vestibulum rhoncus lacus nulla, at congue metus dictum eu. Nam interdum, neque hendrerit semper interdum, tellus orci semper metus, tristique placerat urna tellus at elit. Praesent vitae dolor tortor. Pellentesque tempor, mauris sit amet commodo vestibulum, dui enim cursus tellus, vel dignissim est ante convallis quam. Vestibulum egestas eros eget dui ultrices, id ullamcorper nulla cursus.",
                "uses": "long texte about the use cases and exemple.",
                "restrictions": "Detail about it\'s restrictions.",
                "required": false
            }],
            "linkedClasses": [{"class": "person", "link": "part_of", "source": "schema.org"}, {
                "class": "projet",
                "link": "part_of",
                "source": "schema.org"
            }, {"class": "team", "link": "own", "source": "schema.org"}]
        }]
    };

    //filter the array to get only the selected information
    const classe = data.classes.find((classe) => classe.slug === context.params.slug);

    //return the result as a props
    return {
        props: {data: classe, active: true, globalData: data}
    }
}


const ClassPage = ({data, active, globalData}) => {

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
            '@type': 'Organization',
            name: "Avantage Numérique",
            description: "Avantage numérique est un hub virtuel, physique et mobile qui dessert les secteurs de la culture, des affaires et du savoir. Il vise le développement de l’écosystème créatif, entrepreneurial et technologique du Croissant boréal.",
            mainEntityOfPage: "https://avantagenumerique.org/"
        }
    }

    return (
        <div className="maxWidthPageContainer">
            {/* Set the proper width in the page */}
            <Head>
                <title>{`Classe ${data.title}`}</title>

                {/* Keywords and description to evaluate */}
                <meta name="description"
                      content={`Documentation spécifique à la classe ontologique ${data.title} et à ses propriétés.`}/>
                <meta name="keywords"
                      content={`classe, propriété, sous-classe, schema, avantage numérique, ${data.title}`}/>

                {/* social media meta tag */}
                <meta property="og:title" content={`Classe ${data.title} - Avantage Numérique`}/>
                <meta property="og:description"
                      content={`Documentation spécifique à la classe ontologique ${data.title} et à ses propriétés.`}/>

                <meta name="twitter:title" content={`Classe ${data.title} - Avantage Numérique`}/>
                <meta name="twitter:description"
                      content={`Documentation spécifique à la classe ontologique ${data.title} et à ses propriétés.`}/>

                {/*To add when the domain will be selected .... <link rel="canonical" href="https://avantagenumerique.org/">  */}

                {/* Structured data */}
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(JSON.stringify(schema))}}
                />
            </Head>

            <h1>{data.title}</h1>
            <ClassInfos data={data} active={active} globalData={globalData}/>

        </div>
    );
}

export default ClassPage;