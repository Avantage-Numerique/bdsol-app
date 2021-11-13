import Head from 'next/head'

export default function Presentation() {
  return (
    <div>
      <Head>
        
      <title>Présentation - Avantage Numérique</title>

      {/* Keywords and description to evaluate */}
      <meta name="description" content="Page de présentation de la nouvelle ontologie utilisée dans la base de donnée de l'initiative Avantage Numérique." />
      <meta name="keywords" content="Présentation, ontologie, avantage numérique, base de données" /> 

      {/* social media meta tag */}
      <meta property="og:title"              content="Présentation - Avantage Numérique" />
      <meta property="og:description"        content="Page de présentation de la nouvelle ontologie utilisée dans la base de donnée de l'initiative Avantage Numérique." />

      <meta name="twitter:title"             content="Présentation - Avantage Numérique"/>
      <meta name="twitter:description"       content="Page de présentation de la nouvelle ontologie utilisée dans la base de donnée de l'initiative Avantage Numérique."/>

      {/* 

      To add when the domain will be selected ....

      <link rel="canonical" href="https://avantagenumerique.org/">  

*/}

      </Head>

      <h1>Page de présentation de l'information</h1>

    </div>
  )
}
