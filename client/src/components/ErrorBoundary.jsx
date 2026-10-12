import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Caught by Error Boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>Something went wrong.</h2>
          <p>
            The editor couldn&apos;t load. Please refresh or contact support if
            the problem persists.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
