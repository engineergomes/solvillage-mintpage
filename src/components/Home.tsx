import { useEffect, useMemo, useState } from "react";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { IsLive } from "./isLive";
import Image from "next/image";
import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import useSplToken from "../hooks/useSplToken";
import {
    awaitTransactionSignatureConfirmation,
    CandyMachineAccount,
    CANDY_MACHINE_PROGRAM,
    getCandyMachineState,
    mintOneToken,
} from "../helpers/candy-machine";
import { AlertState } from "../helpers/utils";
import { MintButton } from "./MintButton";
import { PhaseHeader } from "./PhaseHeader";
import { GatewayProvider } from "@civic/solana-gateway-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import MyParticles from "./Particles";

export interface HomeProps {
    candyMachineId?: anchor.web3.PublicKey;
    connection: anchor.web3.Connection;
    startDate: number;
    txTimeout: number;
    rpcHost: string;
}

const Home = (props: HomeProps) => {
    const [yourSOLBalance, setYourSOLBalance] = useState<number | null>(null);
    const rpcUrl = props.rpcHost;
    const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT
    const wallet = useWallet();
    const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();
    const [isLoading, isSPLExists] = useSplToken();
    const anchorWallet = useMemo(() => {
        if (
            !wallet ||
            !wallet.publicKey ||
            !wallet.signAllTransactions ||
            !wallet.signTransaction
        ) {
            return;
        }

        return {
            publicKey: wallet.publicKey,
            signAllTransactions: wallet.signAllTransactions,
            signTransaction: wallet.signTransaction,
        } as anchor.Wallet;
    }, [wallet]);

    const [alertState, setAlertState] = useState<AlertState>({
        open: false,
        message: "",
        severity: undefined,
    });

    const onMint = async () => {
        try {
            setIsMinting(true);
            document.getElementById("#identity")?.click();
            if (wallet.connected && candyMachine?.program && wallet.publicKey) {
                const mintTxId = (
                    await mintOneToken(candyMachine, wallet.publicKey)
                )[0];

                let status: any = { err: true };
                if (mintTxId) {
                    status = await awaitTransactionSignatureConfirmation(
                        mintTxId,
                        props.txTimeout,
                        props.connection,
                        true
                    );
                }

                if (!status?.err) {
                    setAlertState({
                        open: true,
                        message: "Congratulations! Mint succeeded!",
                        severity: "success",
                    });
                } else {
                    setAlertState({
                        open: true,
                        message: "Mint failed! Please try again!",
                        severity: "error",
                    });
                }
            }
        } catch (error: any) {
            console.log("err ", error);
            // TODO: blech:
            let message = error.msg || "Minting failed! Please try again!";
            if (!error.msg) {
                if (!error.message) {
                    message = "Transaction Timeout! Please try again.";
                } else if (error.message.indexOf("0x138")) {
                } else if (error.message.indexOf("0x137")) {
                    message = `SOLD OUT!`;
                } else if (error.message.indexOf("0x135")) {
                    message = `Insufficient funds to mint. Please fund your wallet.`;
                }
            } else {
                if (error.code === 311) {
                    message = `SOLD OUT!`;
                    window.location.reload();
                } else if (error.code === 312) {
                    message = `Minting period hasn't started yet.`;
                }
            }

            setAlertState({
                open: true,
                message,
                severity: "error",
            });
        } finally {
            setIsMinting(false);
        }
    };

    useEffect(() => {
        (async () => {
            if (!anchorWallet) {
                return;
            }

            const balance = await props.connection.getBalance(
                anchorWallet.publicKey
            );
            setYourSOLBalance(balance);

            if (props.candyMachineId) {
                try {
                    const cndy = await getCandyMachineState(
                        anchorWallet,
                        props.candyMachineId,
                        props.connection
                    );
                    setCandyMachine(cndy);
                } catch (e) {
                    console.log("Problem getting candy machine state");
                    console.log(e);
                }
            } else {
                console.log("No candy machine detected in configuration.");
            }
        })();
    }, [anchorWallet, props.candyMachineId, props.connection]);

    return (
        <div className="flex flex-col gap-12 items-center justify-center flex-wrap gap-x-32 lg:flex-row">
            <div className="flex items-center justify-between">
                <Image
                    className="rounded-full"
                    width={500}
                    height={500}
                    alt="SOLVILLAGE"
                    loading="lazy"
                    src={"/neo2.png"}
                />
            </div>

            <div className="flex justify-between bg-black opacity-70 p-2 rounded-lg ">
                <div className="flex flex-col items-center justify-between gap-3">
                    <IsLive
                        candyMachine={candyMachine}
                        rpcUrl={rpcUrl}
                        whiteList={isSPLExists}
                    />
                    <div className="flex flex-col items-center justify-between gap-5">
                        <div className="flex flex-col gap-3">
                            <div className="text-center text-3xl text-white font-medium  m-0">
                                Mint Your
                            </div>
                            <div className="text-center text-5xl text-white font-bold m-0">
                                SOLVILLAGE
                            </div>
                        </div>

                        {true ? (
                            <PhaseHeader
                                candyMachine={candyMachine}
                                rpcUrl={rpcUrl}
                                whiteList={isSPLExists}
                            />
                        ) : (
                            <WalletMultiButton
                                style={{
                                    marginBottom: "2.1rem",
                                    justifyContent: "center",
                                }}
                            ></WalletMultiButton>
                        )}
                    </div>
                    <>
                        <div>
                            {candyMachine?.state.isActive &&
                            candyMachine?.state.gatekeeper &&
                            wallet.publicKey &&
                            wallet.signTransaction ? (
                                <GatewayProvider
                                    wallet={{
                                        publicKey:
                                            wallet.publicKey ||
                                            new PublicKey(
                                                CANDY_MACHINE_PROGRAM
                                            ),
                                        //@ts-ignore
                                        signTransaction: wallet.signTransaction,
                                    }}
                                    // // Replace with following when added
                                    // gatekeeperNetwork={candyMachine.state.gatekeeper_network}
                                    gatekeeperNetwork={
                                        candyMachine?.state?.gatekeeper
                                            ?.gatekeeperNetwork
                                    } // This is the ignite (captcha) network
                                    /// Don't need this for mainnet
                                    clusterUrl={rpcUrl}
                                    options={{ autoShowModal: false }}
                                >
                                    <MintButton
                                        candyMachine={candyMachine}
                                        isMinting={isMinting}
                                        onMint={onMint}
                                    />
                                </GatewayProvider>
                            ) : (
                                <MintButton
                                    candyMachine={candyMachine}
                                    isMinting={isMinting}
                                    onMint={onMint}
                                />
                            )}
                        </div>
                    </>
                </div>

                <Snackbar
                    open={alertState.open}
                    autoHideDuration={6000}
                    onClose={() =>
                        setAlertState({ ...alertState, open: false })
                    }
                >
                    <Alert
                        onClose={() =>
                            setAlertState({ ...alertState, open: false })
                        }
                        severity={alertState.severity}
                    >
                        {alertState.message}
                    </Alert>
                </Snackbar>
            </div>
            <MyParticles />
        </div>
    );
};

export default Home;
