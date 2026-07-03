import {
  LayoutDashboard,
  Users,
  UserCog,
  ClipboardCheck,
  Trophy,
  Dumbbell,
  Wallet,
  Package,
  Bell,
  CalendarDays,
  BarChart3,
  Settings,
} from "lucide-react";
const navigation = [

  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Players",
    path: "/players",
    icon: Users,
  },

  {
    title: "Coaches",
    path: "/coaches",
    icon: UserCog,
  },

  {
    title: "Attendance",
    path: "/attendance",
    icon: ClipboardCheck,
  },

  {
  title: "Matches",
  path: "/matches",
  icon: Dumbbell,
},
  {
    title: "Tournaments",
    path: "/tournaments",
    icon: Trophy,
  },

  {
    title: "Fees",
    path: "/fees",
    icon: Wallet,
  },

  {
    title: "Equipment",
    path: "/equipment",
    icon: Package,
  },

  {
    title: "Notice Board",
    path: "/notice-board",
    icon: Bell,
  },

  {
    title: "Calendar",
    path: "/calendar",
    icon: CalendarDays,
  },

  {
    title: "Statistics",
    path: "/statistics",
    icon: BarChart3,
  },

  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },

];


export default navigation;
