import Match from "../models/Match.js";
import Innings from "../models/Innings.js";
import Ball from "../models/Ball.js";

export const startMatch=async(req,res)=>{

try{

const match=await Match.findById(req.params.matchId);

if(!match){

return res.status(404).json({

success:false,

message:"Match not found"

});

}

match.status="Live";

await match.save();

return res.status(200).json({

success:true,

message:"Match Started",

match

});

}

catch(error){

console.error(error);

return res.status(500).json({

success:false,

message:error.message

});

}

};

export const scoreBall=async(req,res)=>{

try{

const ball=await Ball.create({

match:req.params.matchId,

...req.body

});

return res.status(201).json({

success:true,

message:"Ball Recorded",

ball

});

}

catch(error){

console.error(error);

return res.status(500).json({

success:false,

message:error.message

});

}

};

export const endInnings=async(req,res){

try{

const innings=await Innings.findByIdAndUpdate(

req.body.inningsId,

{

isCompleted:true

},

{

new:true

}

);

return res.json({

success:true,

message:"Innings Completed",

innings

});

}

catch(error){

return res.status(500).json({

success:false,

message:error.message

});

}

}

export const finishMatch=async(req,res)=>{

try{

const match=await Match.findByIdAndUpdate(

req.params.matchId,

{

status:"Completed"

},

{

new:true

}

);

return res.json({

success:true,

message:"Match Finished",

match

});

}

catch(error){

return res.status(500).json({

success:false,

message:error.message

});

}

};
