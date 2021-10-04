import Head from 'next/head'

import styles from '../styles/pages/Documentation.module.scss'


export default function Documentation() {
  return (
    <div>
      <Head>
        <title>Avantage Numérique - Documentation complète</title>
      </Head>

      <div className="centerContainer">
        <header>

          <h1>Ceci est le titre de la page</h1>
        </header>
        <section>
          <p>Etiam vel ultrices sapien. Donec ipsum lorem, pharetra non commodo imperdiet, facilisis bibendum quam. Suspendisse consequat tellus massa, ut venenatis lacus rutrum at. Fusce sit amet lectus dui. Donec ut mauris eu nulla porta rutrum quis ornare diam. Nulla sed quam eget magna hendrerit vulputate non porta eros.</p>
        </section>
      </div>
      
    </div>
  )
}
