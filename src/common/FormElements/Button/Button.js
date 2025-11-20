import LinkWithLoading from "@/src/Navigation/LinkWithLoading";
import Link from "next/link";

/**
 * @typedef {Object} ButtonProps
 *
 * @property {string} props.outline Type of button with color on the outline. Receives color value
 * @property {string} props.text_color Type of button with only text. No background or border. Receives color value for the text
 * @property {string} props.color Fallback case : Type of button with full background-color. Receives color value
 * Other styling
 * @property {string} props.size For now, receives the value slim. Otherwise, large by default
 * @property {string} props.text_color_hover Change the color of the text to a specific one when cursor over. Receives color value
 * @property {string} props.className Receives custom class names
 * Action informations
 * @property {string} props.href Redirection link
 * @property {boolean} props.external Tell is the link brings outside of the website or not
 * @property {boolean} props.noLoading The link should **NOT** trigger loading animation if `true`
 * @property {function} props.onClick Action to execute when the button is clicked
 * @property {boolean} props.disabled Tell if the button is disabled or not
 * @property {string} props.type Type of button. Ex : button, submit
 * @property {JSX.Component} props.children Content of the button
 */

/**
 * Button types => receives theme-colors string values
 *
 * @param {ButtonProps} props
 *
 * @return {JSX.Element}
 */
const Button = (props) => {
    /*****  Add the proper classes, starting with the btn *****/
    let classList = ["btn"];

    //Type of display with color class has value : outline | color/full (default) | text-color (without background)
    if (props.outline) {
        //Option 1 : display with outline
        classList.push(`btn-outline-${props.outline}`);
    } else {
        if (props.text_color) {
            //Option 2 : Display only a text button
            classList.push(`btn-as-text btn-text-color-${props.text_color}`);
        } else {
            //Option 3 : Display a button with full color | Default
            classList.push(`btn-color-${props.color || "secondary"}`);
        }
    }
    //Size : For now, slim or not
    if (props.size === "slim") classList.push("btn-slim");
    //Custom text color changing on hover
    if (props.text_color_hover) classList.push(`btn-text-hover-color-${props.text_color_hover}`);
    //Finaly, custom class names to add element or override specific ones
    if (props.className) classList.push(props.className);

    //Generate a string with all classes
    const classesString = classList.join(" ");

    {
        /* If the button is an external link */
    }
    if (props.href && props.external) {
        return (
            <a
                href={props.href}
                className={`${classesString}${props.disabled ? " disabled" : ""}`}
                target={"_blank"}
                rel="noreferrer"
            >
                {props.children}
            </a>
        );
    }

    if (props.href) {
        let LinkComponent = props.noLoading ? Link : LinkWithLoading;

        return (
            <LinkComponent
                href={props.href}
                className={`${classesString} ${props.disabled ? "disabled" : ""}`}
                aria-disabled={props.disabled ? "true" : "false"}
                role={"button"}
                onClick={props.onClick}
            >
                {props.children}
            </LinkComponent>
        );
    }

    {
        /* If the button is not a link, then it calls an action with onClick */
    }
    return (
        <button className={`${classesString}`} type={props.type} onClick={props.onClick} disabled={props.disabled}>
            {/* Button text */}
            {props.children}
        </button>
    );
};

export default Button;
