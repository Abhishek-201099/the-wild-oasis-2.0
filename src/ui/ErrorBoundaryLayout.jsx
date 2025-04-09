import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import { Outlet } from "react-router-dom";

export default function ErrorBoundaryLayout() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <Outlet />
    </ErrorBoundary>
  );
}
