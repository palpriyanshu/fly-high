import React, {ErrorInfo, ReactNode} from "react";

interface State {
    hasError: boolean;
}

interface Props {
    children: ReactNode;
    fallback: ReactNode;
}
export default class ErrorBoundary extends React.Component<Props, State> {
    state: State;
    constructor(props: Props) {
        super(props);
        this.state = {hasError: false};
    }

    public static getDerivedStateFromError(): State {
        return {hasError: true};
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}