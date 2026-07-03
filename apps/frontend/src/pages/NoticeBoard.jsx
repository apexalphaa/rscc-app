import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";

const notices=[

"Practice starts at 6:00 AM.",

"Sunday fitness camp.",

"U16 tournament registration closes Friday.",

"Parents meeting on 20 July."

];

export default function NoticeBoard(){

return(

<DashboardLayout>

<PageHeader
title="Notice Board"
subtitle="Latest Academy Updates"
/>

<div className="space-y-5 mt-8">

{notices.map((notice,index)=>(

<div
key={index}
className="bg-white rounded-3xl shadow-sm p-6"
>

{notice}

</div>

))}

</div>

</DashboardLayout>

)

}
