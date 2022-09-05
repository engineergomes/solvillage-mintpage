import React from "react";
interface ReactCountdownProps {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}
export default function ReactCountdown({
    days,
    hours,
    minutes,
    seconds,
}: ReactCountdownProps) {
    function padZeros(number: string) {
        return number.toString().padStart(2, "0");
    }
    return (
        <div className="container">
            <div className="flex flex-col  w-full">
                <div className="flex flex-row  lg:p-2 p-1 justify-center">
                    <p className="lg:text-2xl  text-2xl  font-roboto">
                        {padZeros(days)} :
                    </p>
                    <p className="lg:text-2xl text-2xl  font-roboto">
                        &nbsp; {padZeros(hours)} &nbsp;
                    </p>
                    <p className="lg:text-2xl text-2xl   font-roboto">
                        : {padZeros(minutes)} &nbsp;
                    </p>
                    <p className="lg:text-2xl text-2xl font-roboto">
                        : {padZeros(seconds)}
                    </p>
                </div>
            </div>
        </div>
    );
}
