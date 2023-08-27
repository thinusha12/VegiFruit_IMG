import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        console.log('Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can return a fallback UI to display to the user
            return <h1>Something went wrong.</h1>;
        }

        // Otherwise, render the children as normal
        return this.props.children;
    }
}

export default ErrorBoundary;
