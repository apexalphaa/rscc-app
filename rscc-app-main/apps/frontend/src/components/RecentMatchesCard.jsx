export default function RecentMatchesCard(){

    const matches=[

        "54 vs Titans",

        "32 vs Royals",

        "71 vs Warriors",

        "12 vs Lions",

    ];

    return(

        <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-6">

                Recent Matches

            </h2>

            <div className="space-y-4">

                {matches.map(match=>(

                    <div
                        key={match}
                        className="border rounded-xl p-4"
                    >

                        {match}

                    </div>

                ))}

            </div>

        </div>

    )

}
