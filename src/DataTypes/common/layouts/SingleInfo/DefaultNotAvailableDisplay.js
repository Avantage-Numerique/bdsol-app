/**
 *
 * @param {{ NAMessage: string; NAComponent: React.JSX.Element}} props
 * @returns
 */
export const DefaultNotAvailableDisplay = ({ NAMessage, NAComponent }) => {
    return (
        <div className={`d-flex flex-column`}>
            {NAMessage && <p>{NAMessage}</p>}
            <div></div>
            {NAComponent && <div className={`${styles["default-component--display"]}`}>{NAComponent}</div>}
        </div>
    );
};
