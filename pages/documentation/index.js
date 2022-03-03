import Documentation from '../../documentation/pages/Documentation'

import Config from '../../Config'


// Fetch the documentation data from the Api and pass it as a props
//Can only be done from the page
export const getStaticProps = async () => {

  const res = await fetch(Config.apiBaseHostName);
  const data = await res.json();

  return {
    props: {documentation: data} // will be passed to the page component as props
  }
}

const Page = ( {documentation} ) => { return <Documentation documentation={documentation}/> } 

export default Page