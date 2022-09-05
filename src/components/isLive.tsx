import { CandyMachineAccount } from "../helpers/candy-machine";
import { toDate } from "../helpers/utils";
import Countdown from "react-countdown";
import React from "react";
import ReactCountdown from "./ReactCountdown";

export enum Phase {
    WaitForCM,
    Live,
    Unknown,
    NotLive,
}

export function getPhase(candyMachine: CandyMachineAccount | undefined): Phase {
    return Phase.Live;
}

export interface DarkContainerProps {
    text: string | undefined;
    mintInfo?: boolean;
    whiteList?: boolean;
    candyMachine?: CandyMachineAccount | undefined;
}

type PhaseHeaderProps = {
    candyMachine?: CandyMachineAccount;
    rpcUrl: string;
    whiteList: boolean;
};

export const IsLive = ({ candyMachine, whiteList }: PhaseHeaderProps) => {
    const date = toDate(candyMachine?.state.goLiveDate);
    const candyMachineGoLive = toDate(
        candyMachine?.state.goLiveDate
    )?.getTime();
    const phase = getPhase(candyMachine);
    const renderer = ({
        days,
        hours,
        minutes,
        seconds,
        completed,
    }: {
        days: any;
        hours: any;
        minutes: any;
        seconds: any;
        completed: any;
    }) => {
        return (
            <ReactCountdown
                days={days}
                minutes={minutes}
                hours={hours}
                seconds={seconds}
            ></ReactCountdown>
        );
    };

    return (
        <>
            {whiteList ? (
                <div className="text-white text-lg">WHITELISTED!</div>
            ) : Date.now() >= 1669998800000 ? (
                <div className="text-white text-lg">MINT IS LIVE!</div>
            ) : (
                <Countdown renderer={renderer} date={1669998800000}></Countdown>
            )}
        </>
    );
};
