import styles from "./Spinner.module.scss";
import AvnuLoading from "@/common/widgets/loading/AvnuLoading";
import { LoadingStates } from "@/common/widgets/loading/LoadingStates";
import { useEffect, useState } from "react";

const Spinner = ({ fixed, absolute, reverse, className, label, loadingState }) => {
    const [currentAnimateClass, setCurrentAnimateClass] = useState(styles["spinner__container--animateIn"]);

    /*useEffect(() => {
        if (loadingState && loadingState.state === LoadingStates.LOADING.state) {
            setCurrentAnimateClass(styles["spinner__container--animateIn"])
        } else {
            setCurrentAnimateClass(styles["spinner__container--animateOut"])
        }
    }, [loadingState])*/

    return (
        <div
            className={`${styles["spinner__container"]}  ${className} ${fixed ? styles["spinner__container--fixed"] : ""} ${absolute ? styles["spinner__container--absolute"] : ""} ${currentAnimateClass}`}
        >
            <AvnuLoading fixed={fixed} reverse={reverse} />
            {label && (
                <p className="text-center pt-5">
                    <strong>{label}</strong>
                </p>
            )}
        </div>
    );
};

export default Spinner;
