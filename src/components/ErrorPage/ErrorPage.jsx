import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  location.reload();
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>Refreshing...</p>
    </div>
  );
}
