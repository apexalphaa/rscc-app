import Ball from "../models/Ball.js";
import Innings from "../models/Innings.js";

export const recordBall = async(data)=>{

    const ball=await Ball.create(data);

    const innings=await Innings.findById(data.innings);

    innings.totalRuns+=data.runs+data.extraRuns;

    if(data.wicket){

        innings.wickets+=1;

    }

    if(
        data.extraType!=="Wide" &&
        data.extraType!=="No Ball"
    ){

        innings.balls+=1;

    }

    innings.overs=Math.floor(innings.balls/6)+((innings.balls%6)/10);

    await innings.save();

    return ball;

};
