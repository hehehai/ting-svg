import { Component, type ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error) => ReactNode;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // biome-ignore lint/suspicious/noConsole: biome ignore
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback && this.state.error) {
        return this.props.fallback(this.state.error);
      }

      return (
        <div className="flex h-full items-center justify-center p-8">
          <div className="text-center">
            <h2 className="mb-2 font-semibold text-red-600 text-xl">
              Something went wrong!
            </h2>
            <p className="mb-4 text-gray-600">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
              onClick={() =>
                this.setState({ hasError: false, error: undefined })
              }
              type="button"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
