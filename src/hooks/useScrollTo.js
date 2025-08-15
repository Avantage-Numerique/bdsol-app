import {animateScroll, scroller} from "react-scroll";


const useScrollTo = () => {

    const scrollTo = (target) => {
        scroller.scrollTo(target, {
            offset: -50,
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    }
    const scrollToTop = () => {
        if (typeof window !== "undefined" && typeof document !== "undefined") {
            animateScroll.scrollToTop({
                duration: 800,
                delay: 0,
                smooth: "easeInOutQuart",
            });
        }
    }

    return {scrollTo, scrollToTop};
}

export default useScrollTo;
