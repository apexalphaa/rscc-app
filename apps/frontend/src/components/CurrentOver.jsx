export default function CurrentOver({

    balls

}){

    return(

        <div className="bg-white rounded-3xl shadow-sm p-8">

            <h2 className="text-2xl font-bold">

                Current Over

            </h2>

            <div className="flex flex-wrap gap-3 mt-6">

                {balls.map((ball,index)=>(

                    <div

                        key={index}

                        className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold"

                    >

                        {ball}

                    </div>

                ))}

            </div>

        </div>

    )

}
