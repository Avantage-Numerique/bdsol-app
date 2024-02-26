import ResetPassword from '@/auth/components/Forms/ResetPassword/ResetPassword'
import PageMeta from "@/src/common/PageMeta/PageMeta";

const ResetPasswordPage = () => {

    return (
        <>
            <PageMeta 
                title={"Réinitialisation de mot de passe"}
                preventIndexation
            />
            <ResetPassword/>
        </>
    )

}

export default  ResetPasswordPage;