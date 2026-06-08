import Activity from "@/icons/activity";
import Airplay from "@/icons/airplay";
import AlarmClock from "@/icons/alarm-clock";
import AlarmClockCheck from "@/icons/alarm-clock-check";
import AlarmClockMinus from "@/icons/alarm-clock-minus";
import AlarmClockOff from "@/icons/alarm-clock-off";
import AlarmSmoke from "@/icons/alarm-smoke";
import Album from "@/icons/album";
import AlignEndHorizontal from "@/icons/align-end-horizontal";
import AlignEndVertical from "@/icons/align-end-vertical";
import Ambulance from "@/icons/ambulance";
import AirVent from "@/icons/air-vent";
import Accessibility from "@/icons/accessibility";
import Shell from "@/icons/shell";
import AArrowDown from "@/icons/a-arrow-down";
import AArrowUp from "@/icons/a-arrow-up";
import Ampersand from "@/icons/ampersand";
import Anchor from "@/icons/anchor";
import Angry from "@/icons/angry";
import Annoyed from "@/icons/annoyed";
import Antenna from "@/icons/antenna";
import Apple from "@/icons/apple";
import Archive from "@/icons/archive";

type IconListItem = {
  icon: React.ElementType;
  title: string;
 
};

export const ICON_LIST: IconListItem[] = [
     {
        icon: Shell,
        title: "shell"
    },
    {
        icon: Activity,
        title: "activity"
    },
    {
        icon: AlarmClock,
        title: "alarm-clock"
    },
    {
        icon: AlarmClockCheck,
        title: "alarm-clock-check"
    },
    {
        icon: AlarmClockMinus,
        title: "alarm-clock-minus"
    },
    {
        icon: AlarmClockOff,
        title: "alarm-clock-off"
    },
    {
        icon: AlarmSmoke,
        title: "alarm-smoke"
    },
    {
        icon: Album,
        title: "album"
    },
    {
        icon: AlignEndHorizontal,
        title: "align-end-horizontal"
    },
    {
        icon: AlignEndVertical,
        title: "align-end-vertical"
    },
    {
        icon: Ambulance,
        title: "ambulance"
    },
    {
        icon: AirVent,
        title: "air-vent"
    },
    {
        icon: Accessibility,
        title: "accessibility"
    },
    {
        icon: Airplay,
        title: "airplay"
    },
    {
        icon: AArrowDown,
        title: "a-arrow-down"
    },
    {
        icon: AArrowUp,
        title: "a-arrow-up"
    },
    {
        icon: Ampersand,
        title:"ampersand"
    },
    {
        icon:Anchor,
        title:"anchor"
    },
    {
        icon: Angry,
        title: "angry"
    },
    {
        icon: Annoyed,
        title:'annoyed'
    },
    {
        icon: Antenna,
        title: 'antenna'
    },
    {
        icon: Apple,
        title:'apple'
    },
    {
        icon: Archive,
        title:'archive'
    }
].sort((a, b) => a.title.localeCompare(b.title));