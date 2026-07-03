import Breadcrumb from "./Breadcrumb";

export default function PageHeader({

  title,

  subtitle,

}) {

  return (

    <div>

      <Breadcrumb/>

      <h1 className="text-4xl font-black">

        {title}

      </h1>

      <p className="text-slate-500 mt-3">

        {subtitle}

      </p>

    </div>

  );

}
