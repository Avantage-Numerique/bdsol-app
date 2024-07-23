import ResetPassword from '@/auth/components/Forms/ResetPassword/ResetPassword'
import PageMeta from "@/src/common/PageMeta/PageMeta";
import {lang} from "@/common/Data/GlobalConstants";

const ResetPasswordPage = () => {

    return (
        <>
            <PageMeta 
                title={lang.compte__passwordReset__title}
                preventIndexation
            />
            <ResetPassword/>
        </>
    )

}

export default  ResetPasswordPage;