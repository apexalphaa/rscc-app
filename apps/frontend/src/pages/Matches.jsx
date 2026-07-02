import {useState} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import PageHeader from "../components/PageHeader";

import ScoreBoard from "../components/ScoreBoard";

import RunButtons from "../components/RunButtons";

import ExtraButtons from "../components/ExtraButtons";

import CurrentOver from "../components/CurrentOver";

export default function Matches(){

    const [score,setScore]=useState(0);

    const [wickets,setWickets]=useState(0);

    const [balls,setBalls]=useState([]);

    const [overs,setOvers]=useState(0);

    function legalBall(value){

        setBalls(prev=>{

            const updated=[...prev,value];

            if(updated.length===6){

                setOvers(prev=>prev+1);

                return [];

            }

            return updated;

        });

    }

    function addRun(run){

        setScore(prev=>prev+run);

        legalBall(run);

    }

    function wicket(){

        setWickets(prev=>prev+1);

        legalBall("W");

    }

    function wide(){

        setScore(prev=>prev+1);

        setBalls(prev=>[...prev,"WD"]);

    }

    function noBall(){

        setScore(prev=>prev+1);

        setBalls(prev=>[...prev,"NB"]);

    }

    return(

        <DashboardLayout>

            <PageHeader

                title="Live Match"

                subtitle="Ball by ball scoring"

            />

            <div className="mt-8">

                <ScoreBoard

                    score={score}

                    wickets={wickets}

                    overs={overs+balls.length/10}

                />

            </div>

            <div className="grid lg:grid-cols-2 gap-8 mt-8">

                <RunButtons

                    addRun={addRun}

                />

                <ExtraButtons

                    wicket={wicket}

                    wide={wide}

                    noBall={noBall}

                />

            </div>

            <div className="mt-8">

                <CurrentOver

                    balls={balls}

                />

            </div>

        </DashboardLayout>

    )

}
