import Particles from "react-tsparticles";

export default function MyParticles() {
    return (
        <>
            <Particles
                className="absolute"
                id="tsparticles"
                params={{
                    background: {
                        color: {
                            value: "#000",
                        },
                        position: "50% 50%",
                        repeat: "no-repeat",
                        size: "cover",
                    },
                    fullScreen: {
                        zIndex: -1,
                    },
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                                parallax: {
                                    force: 10,
                                },
                            },
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40,
                                divs: {
                                    distance: 2,
                                    duration: 0.4,
                                    mix: false,
                                    selectors: [],
                                },
                            },
                            grab: {
                                distance: 400,
                            },
                            repulse: {
                                divs: {
                                    distance: 200,
                                    duration: 0.4,
                                    factor: 100,
                                    speed: 1,
                                    maxSpeed: 50,
                                    selectors: [],
                                },
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: {
                                value: "#ffffff",
                            },
                            distance: 150,
                            enable: true,
                            opacity: 0.4,
                        },
                        move: {
                            attract: {
                                rotate: {
                                    x: 600,
                                    y: 1200,
                                },
                            },
                            enable: true,
                            path: {},

                            speed: 6,
                            spin: {},
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                            value: 30,
                        },
                        opacity: {
                            value: {
                                min: 0.1,
                                max: 0.5,
                            },
                            animation: {
                                enable: true,
                                speed: 1,
                                minimumValue: 0.1,
                            },
                        },

                        size: {
                            value: 3,
                            animation: {
                                speed: 16,
                                minimumValue: 3,
                            },
                        },
                    },
                }}
            />
        </>
    );
}
