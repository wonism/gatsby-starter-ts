import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
      error: null, // eslint-disable-line react/no-unused-state
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  public render(): ReactNode {
    const { hasError } = this.state;
    const { children, fallback = children } = this.props;

    if (hasError) {
      return fallback;
    }

    return children;
  }
}
