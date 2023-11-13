import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "dark2",
    icon: BanknotesIcon,
    title: "Recordings this week",
    value: "52",
    footer: {
      color: "text-white",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Today's logged Users",
    value: "120",
    footer: {
      color: "text-white",
      value: "+3%",
      label: "than yesterday",
    },
  },
  {
    color: "green",
    icon: UserPlusIcon,
    title: "New Users",
    value: "10",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than last week",
    },
  },
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Broadcasted Audio",
    value: "9",
    footer: {
      color: "text-white",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
