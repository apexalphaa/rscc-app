import { Link } from "react-router-dom";

export default function NotFound(){

return(

<div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">

<h1 className="text-8xl font-black text-green-600">

404

</h1>

<h2 className="text-3xl font-bold mt-6">

Page Not Found

</h2>

<p className="text-slate-500 mt-3">

The page you're looking for doesn't exist.

</p>

<Link
to="/dashboard"
className="mt-8 px-6 py-3 bg-green-600 rounded-xl text-white"
>

Go To Dashboard

</Link>

</div>

)

}
