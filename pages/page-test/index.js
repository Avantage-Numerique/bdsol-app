import React, { useContext } from "react";
import Test from '../../components/Test';

import { AuthContext } from "../../authentication/context/auth-context";

const PageTest = () => {

    const auth = useContext(AuthContext);

    const loggedInMessage = auth.isLoggedIn ? 'user logged-in' : 'user not logged-in'

    return (
        <>
            <div style={{ margin: 20 + 'px', padding: 20 + 'px', color: 'red' }}>
                <Test message={loggedInMessage} />
            </div>
        </>
    )
}

export default PageTest;