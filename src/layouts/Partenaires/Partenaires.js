import Image from "next/image";

import styles from "./Partenaires.module.scss";

import Logo_AN from "@/public/partenaires/Avantage numerique logo.webp";
import Logo_CAC from "@/public/partenaires/CAC-logo.webp";
import Logo_CALQ from "@/public/partenaires/CALQ.webp";
import Logo_CLD from "@/public/partenaires/CLD Rouyn Logo.webp";
import Logo_CREAT from "@/public/partenaires/CREAT.webp";
import Logo_FCCF from "@/public/partenaires/FCCF - Logo.webp";
import Logo_MCC from "@/public/partenaires/MCC - logo.webp";
import Logo_PTVN from "@/public/partenaires/ptvn-logo.webp";
import Logo_QC from "@/public/partenaires/qubec-logo.webp";

const Partenaires = ({ smaller = false }) => {
    return (
        <div className={`${styles["partners-grid"]} ${smaller ? styles["smaller"] : ""}`}>
            <Image src={Logo_AN} alt="Logo Avantage Numérique" />
            <Image src={Logo_PTVN} alt="Logo Petit Théatre du Vieux Noranda" />
            <Image src={Logo_CAC} alt="Logo Conseil des arts du Canada" />
            <Image src={Logo_CALQ} alt="Logo Conseil des arts et des lettres du Québec" />
            <Image src={Logo_CLD} alt="Logo Centre local de développement de Rouyn-Noranda" />
            <Image src={Logo_CREAT} alt="Logo Chaire en économie créative & mieux-être" />
            <Image src={Logo_FCCF} alt="Logo Fédération culturelle canadienne-française" />
            <Image src={Logo_MCC} alt="Logo Ministère Culture et Communication du Québec" />
            <Image src={Logo_QC} alt="Logo gouvernement du Québec" />
        </div>
    );
};

export default Partenaires;
