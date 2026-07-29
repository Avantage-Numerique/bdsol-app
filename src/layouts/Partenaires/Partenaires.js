import Image from "next/image";

import styles from "./Partenaires.module.scss";

import Logo_CAC from "@/public/partenaires/CAC-logo.webp";
import Logo_CALQ from "@/public/partenaires/CALQ.webp";
import Logo_CREAT from "@/public/partenaires/CREAT.webp";

const Partenaires = () => {
    return (
        <>
            <h2>Partenaires du projet</h2>

            <div className={`${styles["partners-grid"]}`}>
                <Image src={Logo_CAC} alt="Logo CAC" />
                <Image src={Logo_CAC} alt="Logo CAC" />
                <Image src={Logo_CAC} alt="Logo CAC" />
                <Image src={Logo_CALQ} alt="Logo CALQ" />
                <Image src={Logo_CREAT} alt="Logo CREAT" />
            </div>
        </>
    );
};

export default Partenaires;
