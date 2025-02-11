//Styling
import styles from './AvnuLoading.module.scss'


const AvnuLoading = ({fixed, reverse}) => {

    return (
        <div className={`${styles["loader"]}`}>
            <span style={{ "--loading-index":1 }}></span>
            <span style={{ "--loading-index":2 }}></span>
            <span style={{ "--loading-index":3 }}></span>
            <span style={{ "--loading-index":4 }}></span>
            <span style={{ "--loading-index":5 }}></span>
            <span style={{ "--loading-index":6 }}></span>
            <span style={{ "--loading-index":7 }}></span>
            <span style={{ "--loading-index":8 }}></span>
            <span style={{ "--loading-index":9 }}></span>
            <span style={{ "--loading-index":10 }}></span>
            <span style={{ "--loading-index":11 }}></span>
            <span style={{ "--loading-index":12 }}></span>
            <span style={{ "--loading-index":13 }}></span>
            <span style={{ "--loading-index":14 }}></span>
            <span style={{ "--loading-index":15 }}></span>
            <span style={{ "--loading-index":16 }}></span>
            <span style={{ "--loading-index":17 }}></span>
            <span style={{ "--loading-index":18 }}></span>
            <span style={{ "--loading-index":19 }}></span>
            <span style={{ "--loading-index":20 }}></span>
            <div className={`${styles["rocket"]}`}></div>
        </div>
    )
}
export default AvnuLoading
