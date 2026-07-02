import Button from "./common/Button";

import {
    UserPlus,
    ClipboardCheck,
    Trophy,
    Cricket
} from "lucide-react";

export default function QuickActions(){

    return(

        <div className="bg-white rounded-3xl p-8 shadow-sm">

            <h2 className="text-2xl font-bold">

                Quick Actions

            </h2>

            <div className="grid lg:grid-cols-4 gap-5 mt-8">

                <Button>

                    <UserPlus size={18}/>

                    Register Player

                </Button>

                <Button>

                    <ClipboardCheck size={18}/>

                    Attendance

                </Button>

                <Button>

                    <Cricket size={18}/>

                    Start Match

                </Button>

                <Button>

                    <Trophy size={18}/>

                    Tournament

                </Button>

            </div>

        </div>

    )

}
