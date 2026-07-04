import Button from "./common/Button";

export default function TournamentActions(){

    return(

        <div className="bg-white rounded-3xl shadow-sm p-8">

            <h2 className="text-2xl font-bold mb-6">

                Quick Actions

            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">

                <Button>Create Tournament</Button>

                <Button>Fixtures</Button>

                <Button>Points Table</Button>

                <Button>Knockout</Button>

                <Button>Awards</Button>

            </div>

        </div>

    );

}
