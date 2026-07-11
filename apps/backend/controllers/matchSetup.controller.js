import Match from "../models/Match.js";
import generateMatchNumber from "../utils/generateMatchNumber.js";

export const createDraftMatch = async (req,res)=>{

    try{

        const {

            scoringMode,

            matchType,

        } = req.body;

        const match = await Match.create({

            scoringMode,

            matchType,

            matchNumber:generateMatchNumber(),

            createdBy:req.user._id,

        });

        return res.status(201).json({

            success:true,

            message:"Draft Match Created",

            matchId:match._id,

            match,

        });

    }

    catch(error){

        console.error(error);

        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};
