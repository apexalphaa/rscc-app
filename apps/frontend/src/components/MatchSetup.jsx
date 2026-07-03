import { useState } from "react";

import PlayingXISelector from "./PlayingXISelector";
import BatterSelector from "./BatterSelector";
import BowlerSelector from "./BowlerSelector";

export default function MatchSetup(){

    const [playingXI,setPlayingXIState]=useState([]);

    const [striker,setStriker]=useState("");

    const [nonStriker,setNonStriker]=useState("");

    const [bowler,setBowler]=useState("");

    function setPlayingXI(player,checked){

        if(checked){

            setPlayingXIState(prev=>[...prev,player]);

        }else{

            setPlayingXIState(prev=>prev.filter(p=>p!==player));

        }

    }

    return(

        <div className="space-y-8">

            <PlayingXISelector
                playingXI={playingXI}
                setPlayingXI={setPlayingXI}
            />

            <BatterSelector
                playingXI={playingXI}
                striker={striker}
                nonStriker={nonStriker}
                setStriker={setStriker}
                setNonStriker={setNonStriker}
            />

            <BowlerSelector
                playingXI={playingXI}
                bowler={bowler}
                setBowler={setBowler}
            />

        </div>

    )

}
