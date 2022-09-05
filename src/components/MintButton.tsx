import Button from "@material-ui/core/Button";
import { CandyMachineAccount } from "../helpers/candy-machine";
import { CircularProgress } from "@material-ui/core";
import { GatewayStatus, useGateway } from "@civic/solana-gateway-react";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export const MintButton = ({
    onMint,
    candyMachine,
    isMinting,
}: {
    onMint: () => Promise<void>;
    candyMachine?: CandyMachineAccount;
    isMinting: boolean;
}) => {
    const { requestGatewayToken, gatewayStatus } = useGateway();
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (gatewayStatus === GatewayStatus.ACTIVE && clicked) {
            onMint();
            setClicked(false);
        }
    }, [gatewayStatus, clicked, setClicked, onMint]);

    if (useWallet().connected) {
        return (
            <Button
                className="bg-green-600 text-3xl opacity-100 px-6 py-3 hover:bg-green-300 font-bold"
                disabled={
                    candyMachine?.state.isSoldOut ||
                    isMinting ||
                    !candyMachine?.state.isActive
                }
                onClick={async () => {
                    setClicked(true);
                    if (
                        candyMachine?.state.isActive &&
                        candyMachine?.state.gatekeeper
                    ) {
                        if (gatewayStatus === GatewayStatus.ACTIVE) {
                            setClicked(true);
                        } else {
                            await requestGatewayToken();
                        }
                    } else {
                        await onMint();
                        setClicked(false);
                    }
                }}
                variant="contained"
            >
                {candyMachine?.state.isSoldOut ? (
                    "SOLD OUT"
                ) : isMinting ? (
                    <CircularProgress style={{ color: "white" }} />
                ) : (
                    "MINT"
                )}
            </Button>
        );
    } else {
        return (
            <div className="text-white w-full text-center font-bold text-2xl">
                Connect your wallet to mint
            </div>
        );
    }
};
