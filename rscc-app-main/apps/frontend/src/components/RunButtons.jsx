import Button from "./common/Button";

const runs=[0,1,2,3,4,6];

export default function RunButtons({addRun}){

    return(

        <div className="bg-white rounded-3xl shadow-sm p-8">

            <h2 className="text-2xl font-bold mb-6">

                Runs

            </h2>

            <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">

                {runs.map((run)=>(

                    <Button

                        key={run}

                        onClick={()=>addRun(run)}

                    >

                        {run}

                    </Button>

                ))}

            </div>

        </div>

    )

}
