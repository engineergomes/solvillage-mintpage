import React from "react";
import { useRouter } from "next/router";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
    Heading,
    LinkProps,
    Image,
    Box,
    Flex,
    IconButton,
    Stack,
    Collapse,
    // Link,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";

import { HamburgerIcon, CloseIcon, ChevronRightIcon } from "@chakra-ui/icons";

export default function Header() {
    const { isOpen, onToggle } = useDisclosure();
    // const router = useRouter();

    return (
        <div className="lg:mb-24 mb-16">
            <Flex
                borderRadius={"10px"}
                bg={"rgb(0,0,0,0.8)"}
                color={useColorModeValue("white.600", "white")}
                minH={"60px"}
                py={{ base: 2 }}
                px={{ base: 4 }}
                align={"center"}
                justifyContent="space-between"
            >
                <Flex
                    flex={{ base: 1, md: "auto" }}
                    ml={{ base: -2 }}
                    display={{ base: "flex", md: "none" }}
                >
                    <button onClick={onToggle} aria-label={"Toggle Navigation"}>
                        {isOpen ? (
                            <CloseIcon w={3} h={3} />
                        ) : (
                            <HamburgerIcon w={5} h={5} />
                        )}
                    </button>
                </Flex>

                <Link href={"/"}>
                    <a className="text-2xl font-bold ">SOLVILLAGE</a>
                </Link>
                <Flex
                    display={{ base: "none", md: "flex" }}
                    ml={10}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    wrap={"wrap"}
                >
                    <DesktopNav />
                </Flex>
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <Flex
                    position={"relative"}
                    direction={"row"}
                    minWidth={"100%"}
                    alignItems={"right"}
                    justifyContent={"left"}
                    wrap={"wrap"}
                >
                    <MobileNav />
                </Flex>
            </Collapse>
        </div>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.600", "white.200");
    const linkHoverColor = useColorModeValue("gray.800", "white");
    const popoverContentBgColor = useColorModeValue("white", "gray.800");
    const router = useRouter();

    return (
        <div className="w-full items-center justify-between gap-x-3 flex-wrap flex">
            <div className="flex gap-4 items-center ">
                <div
                    className={`${
                        router.pathname === "/"
                            ? "border-b-2 border-solid border-white"
                            : ""
                    } `}
                >
                    <Link href="/">Mint</Link>
                </div>
                <div
                    className={`${
                        router.pathname === "/how-to"
                            ? "border-b-2 border-solid border-white"
                            : ""
                    } `}
                >
                    <Link href="/how-to">How to</Link>
                </div>
            </div>

            <Flex
                alignItems="center"
                justifyContent="space-between"
                direction={"row"}
                columnGap={"1.6rem"}
            >
                <a
                    href="https://discord.gg/kMFvaSFu"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={["fab", "discord"]} size="2x" />
                </a>

                <a
                    href="https://twitter.com/SolvillageNFT"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
                </a>

                <WalletMultiButton
                    style={{
                        boxShadow: "none",
                        fontWeight: 500,
                        fontFamily: '"Be Vietnam Pro"',
                        fontSize: "0.75rem",
                    }}
                ></WalletMultiButton>
            </Flex>
        </div>
    );
};

const MobileNav = () => {
    const router = useRouter();
    return (
        <Stack
            className="z-20"
            position={"absolute"}
            bg={useColorModeValue("#192830", "gray.800")}
            p={4}
            marginTop={"4"}
            borderRadius={"10"}
            display={{ md: "none" }}
        >
            <Flex direction={"column"} rowGap={"0.5rem"}>
                <Link href="/">Home</Link>

                <Link href="/how-to">How to</Link>

                <a
                    href="https://discord.gg/kMFvaSFu"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={["fab", "discord"]} size="2x" />
                </a>

                <a
                    href="https://twitter.com/SolvillageNFT"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
                </a>

                <WalletMultiButton
                    style={{
                        boxShadow: "none",
                        fontWeight: 500,
                        fontFamily: '"Be Vietnam Pro"',
                        fontSize: "0.75rem",
                    }}
                ></WalletMultiButton>
            </Flex>
        </Stack>
    );
};
