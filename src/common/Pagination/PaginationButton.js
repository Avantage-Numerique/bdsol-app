//import {forceHttps} from "@/src/helpers/url";
import React from "react";
//import Icon from "@/common/widgets/Icon/Icon";
import styles from "./Pagination.module.scss"
import Icon from "@/common/widgets/Icon/Icon";

/**
 *
 * @param props
 * @param props.label
 * @param props.pageNumber
 * @param props.className
 * @param props.clickMethod
 * @param props.clearList
 * @param props.disabled
 * @param props.isCurrent
 * @param props.isNavigation
 * @param props.labelIsIconClass
 * @return {PaginationButton}
 * @constructor
 */
const PaginationButton = (props) => {
    const {
        label,
        pageNumber,
        className,
        clickMethod,
        clearList,
        disabled,
        isCurrent,
        isNavigation,
        labelIsIconClass
    } = props;

    let additionnalsClasses = isCurrent ? styles["current"] : "";
    additionnalsClasses += isNavigation ? styles["btn-pagination-navigation"] : "";

    return (

        <button
            className={`${styles["btn-pagination"]} ${className} ${additionnalsClasses}`}
            key={"btn-pagination-page-" + label}
            onClick={clickMethod && (() => clickMethod(parseInt(pageNumber), clearList))}
            disabled={disabled}>
            {labelIsIconClass ?
                (
                    <Icon iconName={label} />
                )
                :
                label
            }
        </button>
    );
}

export {PaginationButton};