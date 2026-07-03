import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";

const events=[

{
date:"15 Jul",
title:"Practice Match"
},

{
date:"18 Jul",
title:"Fitness Test"
},

{
date:"22 Jul",
title:"Tournament"
},

{
date:"30 Jul",
title:"Parents Meeting"
}

];

export default function Calendar(){

return(

<DashboardLayout>

<PageHeader
title="Calendar"
subtitle="Training & Events"
/>

<div className="space-y-5 mt-8">

{events.map(event=>(

<div
key={event.date}
className="bg-white rounded-3xl shadow-sm p-6 flex justify-between"
>

<div>

<h2 className="font-bold">

{event.title}

</h2>

</div>

<div>

{event.date}

</div>

</div>

))}

</div>

</DashboardLayout>

)

}
