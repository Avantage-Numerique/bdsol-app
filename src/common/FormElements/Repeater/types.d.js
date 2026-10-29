/**
 *
 * @typedef {string} RepeaterKey
 *
 * @typedef {{ _id: string; occupation: string, skills: string[], subMeta: { order: number }; }} FormStructure
 *
 * @typedef {(key: RepeaterKey) => void} DeleteIterationByKey
 *
 * @typedef {(key: RepeaterKey, value: FormStructure, isValid: boolean, hasAnyInputBeenTouched: boolean) => void} UpdateIterationValue
 *
 */

/**
 * @typedef {Object} RepeaterProps
 *
 * @property {import("react").PropsWithChildren['children']} children
 * Elements to repeat (can be on multiple level. EX : <div><Input /></div>)
 * List of key words in the children (props name that the repeater is going to be looking for) :
 * - repeaterDeleteElem : if true, an onClick event is going to be added to delete this iteration
 * - name : if defined and if it fits the values passed in the form init structure, it is going to receive the sub formTools for this specific iteration
 *
 * @property {FormStructure} formInitStructure Structure of the form for every instance of the repeated element
 *  CAREFUL => the names in the formInitstructure must reflect the names of the fields entered as children
 *
 * @property {FormTools<FormStructure>} formTools FormTools of the main form. Give us acces to the whole form data
 * @property {string} name Name to refer to the repeater in the main form State
 * @property {FormStructure[]} initValues Expected to be an array of object where each object contains the values for one iteration of this repeater
 * @property {boolean} sortable = false : If true, the repeater add an order value, display the drag and drop UI and activate that function
 * @property {string} className Represent the class names of the generated containers to repeat
 */

/**
 * @typedef {Object} RepeaterSingleIterationProps
 *
 * @property {import("react").PropsWithChildren['children']} children
 * @property {FormStructure} formInitSubStructure
 * @property {RepeaterKey} iterationKey
 * @property {UpdateIterationValue} updateIterationValue
 * @property {DeleteIterationByKey} deleteIterationByKey
 */

/**
 * @typedef {Object} SortableItemProps
 *
 * @property {{ key: RepeaterKey; order: number; initFormStructureWithValues: FormStructure; }} iteration
 * @property {string} className
 * @property {boolean} isDragActive - deprecated: use _sortable.isDragging instead
 * @property {ReturnType<import("@dnd-kit/react/sortable")['useSortable']>} sortable
 * @property {[]} sortedIterationsArray
 * @property {DeleteIterationByKey} deleteIterationByKey
 * @property {UpdateIterationValue} updateIterationValue
 * @property {import("react").PropsWithChildren['children']} children
 * @property {FormStructure} formInitStructure
 * @property {number} index
 */
