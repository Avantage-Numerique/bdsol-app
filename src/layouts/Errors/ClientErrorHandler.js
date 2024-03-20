import React from 'react';
import {lang} from "@/common/Data/GlobalConstants";
import Button from "@/FormElements/Button/Button";
import Error from "@/layouts/Errors/Error";

/**
 * Handling client side error when they happen to avoid having the default next error handler.
 * Application error: a client-side exception has occurred (see the browser console for more information).
 * @source https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 * version 0 : test state.
 */
class ClientErrorHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Example "componentStack":
        //   in ComponentThatThrows (created by App)
        //   in ErrorBoundary (created by App)
        //   in div (created by App)
        //   in App
        console.error(error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.fallback;

            return (
                <Error statusCode={this.props.fallback}>
                    <h4 className={"mb-3"}>{lang.maybeThisWouldHelp}</h4>
                    <nav className="row pt-3 row-cols-1 row-cols-sm-4 gy-3">
                        {
                            entities.map((route, index) => {
                                return (
                                    <div className="col" key={`li${index}${route.label}`}>
                                        <Button href={route.pathname} size="large-100">{route.label}</Button>
                                    </div>
                                )
                            })
                        }
                    </nav>
                </Error>
            )
        }

        return this.props.children;
    }
}

export {ClientErrorHandler};