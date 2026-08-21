export default function TournamentAwards(){

    const awards=[

        {
            title:"Orange Cap",
            player:"Rahul Sharma",
        },

        {
            title:"Purple Cap",
            player:"Aryan Singh",
        },

        {
            title:"MVP",
            player:"Rohit Patel",
        },

        {
            title:"Fair Play",
            player:"RSCC Blue",
        },

    ];

    return(

        <div className="bg-white rounded-3xl shadow-sm p-8">

            <h2 className="text-2xl font-bold mb-6">

                Tournament Awards

            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                {awards.map(item=>(

                    <div
                        key={item.title}
                        className="border rounded-2xl p-6 text-center"
                    >

                        <h3 className="font-bold">

                            {item.title}

                        </h3>

                        <p className="text-slate-500 mt-3">

                            {item.player}

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}
