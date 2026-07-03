import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {

  const location = useLocation();

  const paths = location.pathname
    .split("/")
    .filter(Boolean);

  return (

    <div className="mb-6 text-sm text-slate-500">

      <Link
        to="/dashboard"
        className="hover:text-green-600"
      >
        Dashboard
      </Link>

      {paths.map((item, index) => {

        const url =
          "/" + paths.slice(0, index + 1).join("/");

        return (

          <span key={url}>

            {" / "}

            <Link
              to={url}
              className="hover:text-green-600 capitalize"
            >

              {item.replace("-", " ")}

            </Link>

          </span>

        );

      })}

    </div>

  );

}
