import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  location.reload();
  const error = useRouteError();
  console.error(error);

  return <></>;
}
