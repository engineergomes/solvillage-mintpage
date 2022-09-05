import { Stack, Text, Link } from "@chakra-ui/react";
import Header from "../src/components/Layout/Header";

export default function HowTo() {
    return (
        <>
            <Header />
            <Stack
                bg={"rgb(0,0,0,0.8)"}
                borderRadius={"10px"}
                align={"center"}
                style={{ margin: "2rem 0 1rem 0" }}
            >
                <Stack
                    paddingX={"4"}
                    paddingY={"2"}
                    maxWidth={["100vw", "90vw", "80vw", "70vw"]}
                    spacing={8}
                >
                    <Text fontSize="2rem">
                        A guide to getting your{" "}
                        <Text as="span" fontWeight="regular">
                            SOLVILLAGE NFT
                        </Text>
                    </Text>
                    <Stack spacing={3}>
                        <Text fontSize="1rem" pb="1rem">
                            0. If you already have SOL in any Solana wallet,
                            just go to{" "}
                            <Link href="/#mint" color="blue">
                                the minting page
                            </Link>{" "}
                            and mint your SOLVILLAGE!{" "}
                        </Text>
                        <Text fontSize="1rem" pb="1rem">
                            1. Download your Solana wallet from{" "}
                            <Link
                                href="https://phantom.app/"
                                isExternal
                                color="blue"
                            >
                                phantom.app
                            </Link>
                            .
                        </Text>
                        <Stack>
                            <Text fontSize="1rem" mb="1rem">
                                2. Now go to{" "}
                                <Link
                                    href="https://binance.com"
                                    isExternal
                                    color="blue"
                                >
                                    binance.com
                                </Link>{" "}
                                and buy your cryptocurrencies to mint the
                                SOLVILLAGE.
                            </Text>
                            <Stack px={5}>
                                <Text fontSize="1rem" pb="1rem">
                                    a. Follow{" "}
                                    <Link
                                        href="https://www.binance.com/pt-BR/fiat/deposit/USD"
                                        isExternal
                                        color="blue"
                                    >
                                        this link
                                    </Link>{" "}
                                    to deposit FIAT (your country's currency) to
                                    buy some SOL. we recommend that you deposit
                                    the amount equivalent to 0.5 SOL, to pay the
                                    transaction fees.
                                </Text>
                                <Text fontSize="1rem" pb="1rem">
                                    b.{" "}
                                    <Link
                                        href="https://www.binance.com/pt-BR/convert"
                                        color="blue"
                                        isExternal
                                    >
                                        Here
                                    </Link>{" "}
                                    you can trade your FIAT for SOL.
                                </Text>
                                <Text fontSize="1rem" pb="1rem">
                                    c. Now, if you go to{" "}
                                    <Link
                                        href="https://www.binance.com/pt-BR/my/wallet/account/main"
                                        color="blue"
                                        isExternal
                                    >
                                        your wallet on Binance
                                    </Link>{" "}
                                    you can see your SOL balance. Click on
                                    WITHDRAW to receive this tokens on your
                                    wallet (created at the beginning of the
                                    tutorial).
                                </Text>
                                <Text fontSize="1rem" pb="1rem">
                                    d. In the form that you are seeing, fill the
                                    "Address" field with your Phantom wallet
                                    address, which you can get by clicking on
                                    the address showed on Phantom.
                                </Text>
                                <Text fontSize="1rem" pb="1rem">
                                    f. Select how many SOL do you want to
                                    withdraw, complete the security steps and in
                                    few minutes you'll be able to see your
                                    cryptocurrencies on your Phantom wallet.
                                </Text>
                                <Text fontSize="1rem" pb="1rem">
                                    g. Now you can mint your SOLVILLAGE, just go
                                    to{" "}
                                    <Link href="/#mint" color="blue">
                                        the minting page
                                    </Link>{" "}
                                    and be happy!
                                </Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}
