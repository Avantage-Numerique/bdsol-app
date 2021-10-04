import Head from 'next/head'

import styles from '../styles/pages/Documentation.module.scss'


export default function Documentation() {
  return (
    <div className={styles.pageContent}>
      <Head>
        <title>Avantage Numérique - Documentation complète</title>
      </Head>

      <header>
        <div className="maxWidthPageContainer">
          <h1>Documentation complète sur l'ontologie utilisée dans la BDSOL</h1>
          <p>Etiam vel ultrices sapien. Donec ipsum lorem, pharetra non commodo imperdiet, facilisis bibendum quam. Suspendisse consequat tellus massa, ut venenatis lacus rutrum at. Fusce sit amet lectus dui. Donec ut mauris eu nulla porta rutrum quis ornare diam. Nulla sed quam eget magna hendrerit vulputate non porta eros.</p>
        </div>
      </header>
      <section>
      </section>
      
    </div>
  )
}
