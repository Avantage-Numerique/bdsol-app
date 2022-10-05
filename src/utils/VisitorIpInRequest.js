
export async function getServerSideProps(context) {

    const {req} = context,
        data = {
            welcome: "Hi there from getServerSideProps",
            ip: "not set",
            req: (req !== undefined) && (req !== null)
        }

    if (req) {

        if (req.headers["x-forwarded-for"]) {
            data.ip = req.headers["x-forwarded-for"].split(',')[0];
        }

        if (req.headers["x-real-ip"]) {
            data.ip = req.connection.remoteAddress;
        }

        if (req.connection.remoteAddress) {
            data.ip = req.connection.remoteAddress;
        }
    }

    //ip = req.connection.remoteAddress;

    return {
        props: {
            data
        }
    }
}