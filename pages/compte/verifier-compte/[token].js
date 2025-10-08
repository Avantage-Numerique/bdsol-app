import Button from "@/src/common/FormElements/Button/Button";
import { clientSideExternalApiRequest } from "@/src/hooks/http-hook";
import PageHeader from "@/src/layouts/Header/PageHeader";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "@/src/common/UserNotifications/Message/Context/Message-Context";
import { useFormUtils } from "@/src/hooks/useFormUtils/useFormUtils";
import Input from "@/src/common/FormElements/Input/Input";
import PageMeta from "@/src/common/PageMeta/PageMeta";
import Spinner from "@/src/common/widgets/spinner/Spinner";

const verifyAccount = (props) => {
  //Import message context
  const msg = useContext(MessageContext);

  const [verifyState, setVerifyState] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //Main form functionalities
  const { formState, formTools } = useFormUtils(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    { displayResMessage: true },
  );

  const resendToken = async () => {
    const apiResponse = await clientSideExternalApiRequest(
      "/verify-account/resend",
      {
        body: JSON.stringify({ data: { email: formState.inputs.email.value } }),
      },
    );
    if (apiResponse.error) {
      if (apiResponse.code === 200) {
        msg.addMessage({
          text: "Veuillez attendre 5 minutes entre l'envoie d'un nouveau courriel",
          positive: false,
        });
      } else {
        if (apiResponse.code === 418) {
          //I'm a tea pot
          msg.addMessage({
            text: "Le compte est déjà vérifier, vous pouvez vous connecter.",
            positive: true,
          });
          Router.push("/compte/connexion");
        } else {
          msg.addMessage({
            text: "Courriel invalide",
            positive: false,
          });
        }
      }
    } else {
      msg.addMessage({
        text: "Un email de confirmation a été envoyé",
        positive: true,
      });
      Router.push("/compte/a-confirmer");
    }
  };

  useEffect(() => {
    if (!router.isReady) return; // wait for router
    const { token } = router.query;
    setIsLoading(true);
    //Sends request to verifyAccount
    async function verifyToken() {
      const response = await clientSideExternalApiRequest(
        `/verify-account/${token}`,
        { method: "GET" },
      );
      if (!response.error && response.code === 200) {
        //If no error, then account got verified
        setVerifyState(true);
      } else {
        //API return error but status 200 when token is correct length or exist but is now expired
        if (response.code === 200)
          //Token expired
          setVerifyState(false);
        else
          //Already verified account
          //Token is invalid (not right lenght or doesn't exists)
          setVerifyState(null);
      }
      setIsLoading(false);
    }
    verifyToken();
  }, [router.isReady]);

  return (
    <>
      <PageMeta title={"Vérification de compte"} preventIndexation />
      <form>
        <PageHeader
          bg={"bg-primary-lighter"}
          textColor={"text-white"}
          htmlTitle={"Page de confirmation de compte"}
          //description={"Page de confirmation"}
        />
        {isLoading && (
          <div>
            <div>
              <Spinner reverse />
            </div>
            <p className="text-center">
              <strong>Vérification du compte</strong>
            </p>
          </div>
        )}
        {!isLoading && verifyState === null && (
          <>
            <h2>Ce lien est erroné</h2>
            <div>Réessayer à nouveau</div>
          </>
        )}
        {!isLoading && verifyState === false && (
          <>
            <h2>Malheureusement, le lien a expiré...</h2>
            <div>Voulez-vous un nouveau lien de confirmation?</div>
            <Input
              name="email"
              label="Adresse Courriel"
              formClassName="discrete-without-focus form-text-white h2"
              validationRules={[{ name: "REQUIRED" }]}
              formTools={formTools}
            />
            <Button type="button" onClick={resendToken}>
              Envoyer un nouveau lien de confirmation
            </Button>
          </>
        )}
        {!isLoading && verifyState === true && (
          <>
            <h2>Votre compte a bien été vérifié!</h2>
            <div>Vous pouvez maintenant vous connecter</div>
            <Button className="my-3" href="/compte/connexion">
              Se connecter
            </Button>
          </>
        )}
      </form>
    </>
  );
};

export default verifyAccount;
