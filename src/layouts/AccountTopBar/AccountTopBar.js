import Link from 'next/link'
import Button from '@/src/common/FormElements/Button/Button'

//Authentication context
import {useAuth} from '@/auth/context/auth-context'

//Styling
import styles from './AccountTopBar.module.scss'

const AccountTopBar = () => {

    //Import the authentication context 
    const auth = useAuth();
   
    return (
        <div className={`${styles.accountTopBar} col-12 bg-blue2`}>

            {/* Set the max with equal to the website norms */}
            <div className="maxWidthPageContainer">
                <div>Bonjour 
                    <strong><span> Vincent</span></strong>
                </div>
                <div className={styles.alignCenter}>
                    <Link href="/compte">Compte</Link>
                    <div className={styles.verticalLine}></div>
                    <Button onClick={auth.logout}>Se déconnecter</Button>
                </div>
            </div>

        </div>
    );
}

export default AccountTopBar