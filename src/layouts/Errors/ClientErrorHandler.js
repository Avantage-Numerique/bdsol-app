import React from 'react';

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
        console.log(error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.fallback;
        }

        return this.props.children;
    }
}

export {ClientErrorHandler};