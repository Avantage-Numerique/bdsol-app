import Button from "@/FormElements/Button/Button";

/**
 * Button that dry the main nav links.
 * Label is set via the AppRoute if no label is sets.
 * Show an icon if iconClassName is sets
 * Set a default color if params.textColor isn't set.
 * @param props
 * @param props.route {Route}
 * @param props.className {string} add some className to the Componenent.
 * @param props.iconClassName {string} Add an icon via styles classes
 * @param props.label {string} Change the default from AppRoute
 * @param props.handler {function} Function to be triggered on Click of the link/button.
 * @param props.suffix {string} Add # or ? to the href of the link.
 * @param props.params {Object} Object containing addition info, for now only textColor.
 * @param props.params.textColor {string} Change the button text color.
 * @return {JSX.Element}
 * @constructor
 */
export default function MainNavButton(props) {
    const {
        route,
        className,
        iconClassName,
        params,
        label,
        suffix,
        handler
    } = props;

    const textColor = params?.textColor ?? "dark";
    const href = `${route.asPath}${suffix ?? ""}`;
    return (
        <Button text_color={textColor} href={href} className={className ?? ""} onClick={() => handler(href)}>
            <>
                {iconClassName &&
                    <i className={`${iconClassName}`} />
                }
                {label ? label : route.label}
            </>
        </Button>
    )
}

