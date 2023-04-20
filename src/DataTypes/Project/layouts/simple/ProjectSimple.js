import React from "react"
import getConfig from 'next/config';

/***  Components  ****/
import Simple from '@/DataTypes/common/layouts/simple/Simple'
import KebabButton from '@/common/FormElements/KebabButton/KebabButton'

/***  Local styling ***/
import styles from './ProjectSimple.module.scss'
import {lang} from "@/common/Data/GlobalConstants";
import SearchTag from "@/src/common/Components/SearchTag";

const ProjectSimple = ({ data }) => {

    const { publicRuntimeConfig } = getConfig();

    const {
        _id,
        slug,
        firstName,
        lastName,
        nickname,
        //name,
        //username,
        //description,
        catchphrase,
        createdAt,
        occupations,
        mainImage,
        //url,
        //contactPoint
    } = data;

    let fullImagePath;
    if(mainImage)
        fullImagePath = process.env.NEXT_PUBLIC_API_URL +  mainImage.url;

    const imageUrl = mainImage ? fullImagePath : "/general_images/Dennis_Nedry.webp";
    const imageAlt = mainImage ? mainImage.alt : `Photo de profil de l'utilisateur ${firstName} ${lastName}`;

    const link = `/persons/${slug}`;
    const type = lang.Person;
    const name = `${firstName} ${lastName}`;

    return (
        <Simple className={`${styles["person-simple"]}`}>

            <header className={`d-flex flex-column ${styles["person-simple__header"]}`}>

                <section className={`d-flex justify-content-between ${styles["person-simple__header__top-section"]}`}>
                    {/* Empty container - user full for the layout of the row */}
                    <div className="w-0">
                    </div>
                    {/* Profil picture */}
                    <figure className={`mx-1 my-4 ${styles["person-simple__header__picture"]}`}>
                        <a href={link} title={`${type} : ${name}`} className={"position-absolute w-100 h-100"} target={"_self"} rel={"follow"}>
                            <img src={imageUrl} alt={imageAlt} />
                        </a>
                    </figure>
                    {/* Button to see more details */}
                    <KebabButton href={link} />

                </section>
                {/* Header's text and infos */}
                <h3 className="text-center h4 mb-1">{name}</h3>
                {nickname && <h4 className="text-center h5 text-secondary fw-normal">{nickname}</h4>}
                {catchphrase && <h4 className="text-center h5 text-secondary fw-normal">{catchphrase}</h4>}
                {occupations?.length > 0 &&
                    <section className={`${styles["person-simple__header__bottom-section"]}`}>
    
                        {/* Display the three first occupations, then three dots to reprensent that there are others */}
                            <SearchTag
                            className="row"
                            max={3}
                            list={occupations}
                        />
                    </section>
                }

            </header>
            <div className="border-bottom my-1"></div>

            <footer className={`${styles["person-single__footer"]}`}>
                <div className="d-flex justify-content-between">
                    <small>
                        Créé le
                    </small>
                    <small>
                        <time>
                            {(new Date(createdAt)).toLocaleDateString(publicRuntimeConfig.dates.defaultLanguage)}
                        </time>
                    </small>
                </div>
            </footer>

        </Simple>
    )
}

export default ProjectSimple