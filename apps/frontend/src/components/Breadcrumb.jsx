import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {

  const location = useLocation();

  const page =
    location.pathname
      .split("/")
      .filter(Boolean)
      .pop() || "home";

  return (

    <div className="text-sm text-slate-500 mb-6">

      <Link
        to="/"
        className="hover:text-green-600"
      >
        Home
      </Link>

      <span className="mx-2">

        /

      </span>

      <span className="capitalize">

        {page.replace("-", " ")}

      </span>

    </div>

  );

}
