import React from "react";

/**
 * Recursive function to create the children with the proper values
 *
 * @param {import("react").PropsWithChildren['children']} children
 * @param {FormStructure} formInitSubStructure
 * @param {FormTools<unknown>} formTools
 * @param {*} deleteIteration
 */
export const iterateOverChildren = (children, formInitSubStructure, formTools, deleteIteration) => {
    return React.Children.map(children, (child) => {
        // equal to (if (child == null || typeof child == 'string'))
        if (!React.isValidElement(child)) return child;

        //If this child has a name prop,
        // and if the value is equal to one of the values declared for the formState, then it means it is a field and require a formtool
        const newProps = Object.keys(formInitSubStructure).some((key) => key === child.props?.name)
            ? { formTools: formTools }
            : {};

        return React.cloneElement(child, {
            ...child.props,
            ...newProps,
            // you can alse read child original className by child.props.className
            children: iterateOverChildren(child.props.children, formInitSubStructure, formTools, deleteIteration),
        });
    });
};
