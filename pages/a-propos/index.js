import { useContext } from 'react'

//Components

//Context
import { AuthContext } from '../../authentication/context/auth-context'

//styling


/**
 * Really basic page with plain text. This could be dry with an entry or some sort of markdown file.
 * @return {JSX.Element}
 * @constructor
 */
const Index = () => {

    //Import the authentication context
    const auth = useContext(AuthContext);

    return (
        <div className={`col-12`}>

            <header className={`col-12 page-header`}>

                <div className="maxWidthPageContainer">
                    <h1 className={`col-12 blue`}>Qu'est-ce que la BDSOL</h1>
                    <p>Premièrement c'est un accronyme pour : Base de données ouvertes et liées.</p>
                </div>

            </header>

            <section className={`col-12`}>

                {/* Menu for the differents forms */}
                <div className={`maxWidthPageContainer`}>

                    <div className={`col-12}`}>
                        <h2 className="col-12">Pourqoi on développe une base de données ?</h2>
                        <p>Maecenas sed enim ut sem. Elit duis tristique sollicitudin nibh sit amet commodo. Quisque id diam vel quam elementum pulvinar. At tellus at urna condimentum. Id velit ut tortor pretium viverra. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero id. Sagittis nisl rhoncus mattis rhoncus urna neque. Dui vivamus arcu felis bibendum ut tristique et. Nisl nunc mi ipsum faucibus vitae aliquet. Ante in nibh mauris cursus mattis molestie a iaculis. Hac habitasse platea dictumst quisque sagittis. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna.</p>
                    </div>

                </div>

            </section>

        </div>
    )

}

export default Index