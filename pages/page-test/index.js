import React, { useContext } from "react";

import { AuthContext } from "../../authentication/context/auth-context";

const PageTest = () => {

    const auth = useContext(AuthContext);

    if(!auth.isLoggedIn){
        return <div style={{ margin: 20 + 'px', padding: 20 + 'px', color: 'red' }}>
        Page-Test: user not logged in;
        </div>
    } else {
        return <div style={{ margin: 20 + 'px', padding: 20 + 'px', color: 'blue' }}>
        Page-Test: user logged in;
        </div>
    }
}

export default PageTest;