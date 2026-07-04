import { useNavigate } from "react-router-dom";
import Button from "./common/Button";

import {
  UserPlus,
  ClipboardCheck,
  Trophy,
  Dumbbell,
  Wallet,
  Package,
} from "lucide-react";

export default function QuickActions() {

  const navigate = useNavigate();

  return (

    <div className="bg-white rounded-3xl p-8 shadow-sm">

      <h2 className="text-2xl font-bold">

        Quick Actions

      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">

        <Button onClick={() => navigate("/players")}>

          <UserPlus size={18} />

          Register Player

        </Button>

        <Button onClick={() => navigate("/attendance")}>

          <ClipboardCheck size={18} />

          Attendance

        </Button>

        <Button onClick={() => navigate("/matches")}>

          <Dumbbell size={18} />

          Start Match

        </Button>

        <Button onClick={() => navigate("/tournaments")}>

          <Trophy size={18} />

          Tournaments

        </Button>

        <Button onClick={() => navigate("/fees")}>

          <Wallet size={18} />

          Fees

        </Button>

        <Button onClick={() => navigate("/equipment")}>

          <Package size={18} />

          Equipment

        </Button>

      </div>

    </div>

  );

}
