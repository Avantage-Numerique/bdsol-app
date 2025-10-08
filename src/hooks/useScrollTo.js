import {animateScroll, scroller} from "react-scroll";


const useScrollTo = () => {

    const scrollTo = (target) => {
        scroller.scrollTo(target, {
            offset: -50,
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuint",
        });
    }
    const scrollToTop = () => {
        if (typeof window !== "undefined" && typeof document !== "undefined") {
            animateScroll.scrollToTop({
                duration: 800,
                delay: 0,
                smooth: "easeInOutQuint",
            });
        }
    }

    return {scrollTo, scrollToTop};
}

export default useScrollTo;
