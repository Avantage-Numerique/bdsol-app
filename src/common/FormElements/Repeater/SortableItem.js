import { useSortable } from "@dnd-kit/react/sortable";
import Icon from "@/src/common/widgets/Icon/Icon";
import { RepeaterSingleIteration } from "./RepeaterSingleIteration";

import styles from "./Repeater.module.scss";

/**
 * Iterations elements
 *
 * @param {SortableItemProps} props
 */
export const SortableItem = (props) => {
    const {
        iteration,
        className,
        // isDragActive,
        sortable,
        sortedIterationsArray,
        deleteIterationByKey,
        updateIterationValue,
        children,
        formInitStructure,
        index,
    } = props;

    const _sortable = useSortable({
        id: props.id,
        index,
        // type: "", // NOTE: nouvelle prop de @dnd-kit/react
        // accept: "", // NOTE: nouvelle prop de @dnd-kit/react
    });

    return (
        <div
            // style={style}
            id={iteration.key}
            // ref={setNodeRef}
            // eslint-disable-next-line react-hooks/refs
            ref={_sortable.ref}
            // eslint-disable-next-line react-hooks/refs
            className={`d-flex flex-nowrap rounded my-2 ${styles["repeatable"]} ${styles["box-shadow"]} ${className} ${_sortable.isDragging ? "shadow" : undefined}`}
            data-order={iteration.order}
        >
            {sortable && sortedIterationsArray.length > 1 && (
                <div
                    // draggable={true}
                    role={"button"}
                    // eslint-disable-next-line react-hooks/refs
                    ref={_sortable.handleRef}
                    // eslint-disable-next-line react-hooks/refs
                    className={`${styles["dragging-button"]} rounded-start flex-grow-0 d-flex align-items-center p-2 ${_sortable.isDragging ? "dragging" : undefined}`}
                >
                    <Icon className="d-flex align-items-center" iconName="las la-grip-vertical" />
                </div>
            )}

            <div className="container">
                <div className="row">
                    <RepeaterSingleIteration
                        iterationKey={iteration.key}
                        deleteIterationByKey={() => deleteIterationByKey(iteration.key)}
                        formInitSubStructure={
                            iteration.initFormStructureWithValues
                                ? iteration.initFormStructureWithValues
                                : formInitStructure
                        }
                        updateIterationValue={updateIterationValue}
                    >
                        {children}
                    </RepeaterSingleIteration>
                </div>
            </div>
        </div>
    );
};
