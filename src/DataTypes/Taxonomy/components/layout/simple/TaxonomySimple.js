import Link from "next/link";
import React from "react";
import styles from './taxonomy-simple.module.scss';

const TaxonomySimple = ({taxonomy}) => {

    return (
        <Link
            className={`border d-flex justify-content-between align-items-center w-100 p-1 p-md-2 rounded ${styles["list-tag"]}`}
            href={`/categories/${taxonomy.category}/${taxonomy.slug}`}
        >
            <span>{taxonomy.name}</span>
            {
                taxonomy.meta?.statistics?.count > 0 ?
                    <span className={"badge bg-secondary"}>{taxonomy.meta?.statistics?.count}</span>
                    :
                    ""
            }
        </Link>
    )
}

export default TaxonomySimple;