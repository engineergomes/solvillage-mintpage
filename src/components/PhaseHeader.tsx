import * as anchor from "@project-serum/anchor";
import { CandyMachineAccount } from "../helpers/candy-machine";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export enum Phase {
    WaitForCM,
    Live,
    Unknown,
    NotLive,
}

export function getPhase(candyMachine: CandyMachineAccount | undefined): Phase {
    return Phase.Live;
}

interface DarkContainerProps {
    text: string | undefined;
    mintInfo?: boolean;
    whiteList?: boolean;
    candyMachine?: CandyMachineAccount | undefined;
}
export const DarkContainer = ({
    text,
    mintInfo,
    whiteList,
    candyMachine,
}: DarkContainerProps) => {
    const normalPrice: any | undefined = candyMachine?.state?.price;
    const discountPrice: any | undefined =
        candyMachine?.state?.whitelistMintSettings?.discountPrice;
    const Redeemed = candyMachine?.state.itemsRedeemed;
    const price = whiteList
        ? discountPrice / LAMPORTS_PER_SOL
        : normalPrice / LAMPORTS_PER_SOL;
    if (mintInfo) {
        return (
            <>
                <div className="p-5 flex items-center justify-center bg-[#384457] text-white rounded-md font-bold text-base  gap-x-24">
                    <div className="flex flex-col">
                        <div className="flex items-center justify-center ">
                            Price
                        </div>
                        <div className="flex items-center justify-center ">
                            {isNaN(price) ? "-" : "◎" + price}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center justify-center ">
                            Redeemed
                        </div>
                        <div className="flex items-center justify-center ">
                            {Redeemed ? Redeemed : "-"}
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div className="lg:m-2 m-1 lg:p-5 p-2 flex items-center justify-center bg-[#384457] text-white rounded-md font-bold text-base">
                {text}
            </div>
        );
    }
};

const Header = (props: {
    date: anchor.BN | undefined;
    status?: string | undefined;
    whiteList?: boolean | undefined;
    candyMachine?: CandyMachineAccount | undefined;
}) => {
    // const { phaseName, date, status, whiteList, candyMachine } = props;
    const { status, whiteList, candyMachine } = props;
    return (
        <>
            <div className="flex flex-col">
                <DarkContainer
                    text={``}
                    mintInfo
                    whiteList={whiteList}
                    candyMachine={candyMachine}
                />
            </div>
        </>
    );
};

type PhaseHeaderProps = {
    candyMachine?: CandyMachineAccount;
    rpcUrl: string;
    whiteList: boolean;
};

export const PhaseHeader = ({ candyMachine, whiteList }: PhaseHeaderProps) => {
    const phase = getPhase(candyMachine);
    return (
        <>
            {phase === Phase.Unknown && !candyMachine && (
                <Header date={undefined} />
            )}

            {phase === Phase.Live && (
                <Header
                    date={candyMachine?.state.goLiveDate}
                    status={whiteList ? "Whitelisted!" : "LIVE"}
                    whiteList={whiteList}
                    candyMachine={candyMachine}
                />
            )}
        </>
    );
};
