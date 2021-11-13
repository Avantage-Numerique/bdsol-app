import Head from 'next/head'
import styles from '../styles/pages/Index.module.scss'


export default function Home() {
  return (
    <>
      <Head>
        <title>Avantage Numérique</title>

        {/* Keywords and description to evaluate */}
        <meta name="description" content="Site web officiel de présentation de l'ontologie pour l'utilisation de la base de données ouverte et liée de l'initiative Avantage Numérique." />
        <meta name="keywords" content="Accueil, Site Web, Ontologie, Avantage Numérique, croissant boréal" /> 

        {/* social media meta tag */}
        <meta property="og:title"              content="Avantage Numérique" />
        <meta property="og:description"        content="Site web officiel de présentation de l'ontologie pour l'utilisation de la base de données ouverte et liée de l'initiative Avantage Numérique." />
        
        <meta name="twitter:title"             content="Avantage Numérique"/>
        <meta name="twitter:description"       content="Site web officiel de présentation de l'ontologie pour l'utilisation de la base de données ouverte et liée de l'initiative Avantage Numérique."/>

        {/* 

        To add when the domain will be selected ....

        <link rel="canonical" href="https://avantagenumerique.org/">  

        */}
      </Head>
      <div className={styles.pageContent}>

      {/* General header of the page */}
      <header>
        <div className="maxWidthPageContainer">
          <h1>Toute l'information disponible sur l'ontologie utilisée dans la BDSOL d'<i>Avantage Numérique</i></h1>
          
        </div>
      </header>

      {/* Sections of the page*/}
      <section>
        <div className="maxWidthPageContainer">
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a turpis sed mi condimentum varius. Nunc iaculis cursus pharetra. Nunc et ex a augue hendrerit egestas sed suscipit lacus. Phasellus vel nulla at sapien condimentum lacinia quis a erat. Donec laoreet, odio eu commodo hendrerit, tortor enim placerat ipsum, id commodo eros lacus vitae erat. Phasellus ultrices ullamcorper fermentum. Nunc eget iaculis arcu. Sed viverra odio eu ipsum efficitur sollicitudin. Aenean varius finibus tincidunt. Pellentesque nec sapien velit. Donec eleifend ante nunc, accumsan lacinia lorem elementum tempus. Integer dictum eget mauris at vestibulum.
            </p>
            
        </div>
      </section>
      <section>
        <div className="maxWidthPageContainer">
          <p>
            Mauris faucibus metus eros, hendrerit molestie augue aliquet ut. In ut aliquet ex. Donec mi nibh, tempor vestibulum interdum eu, pellentesque ac sem. Duis venenatis sollicitudin dapibus. Donec varius enim id arcu ultricies malesuada a nec diam. Aliquam tincidunt vitae dui nec aliquam. Phasellus efficitur euismod nulla quis pulvinar.
          </p>
        </div>
      </section>
      </div>
    </>
  )
}
