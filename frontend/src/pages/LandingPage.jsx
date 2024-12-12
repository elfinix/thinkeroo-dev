import React from "react";
import backgroundImage from "../assets/LandingPageBg.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const GradientText = styled.h1`
    background: linear-gradient(90deg, rgba(255, 0, 150, 1) 0%, rgba(0, 204, 255, 1) 100%);
    -webkit-background-clip: text;
    color: transparent;
    font-size: 3rem;
    font-weight: bold;
    display: inline-block;
`;

const LandingPage = () => {
    const navigate = useNavigate();

    // Navigate to the login page
    const handleLoginClick = () => {
        navigate("/auth"); // Redirect to the auth page for login
    };

    // Navigate to the sign-up page
    const handleJoinNowClick = () => {
        navigate("/signup"); // Redirect to the sign-up page
    };

    return (
        <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="flex flex-row ml-[65px] p-14">
                <img src="src/assets/logo.jpg" className="w-[3.125rem] sm:w-[4.3rem] transform translate-y-[-15px]" />
                <p className="ml-4 text-white font-lexend text-xl">Thinkeroo</p>
                <div className="flex flex-row ml-auto gap-x-4 sm:gap-x-16 mr-4 sm:mr-20">
                    <p className="text-secondary-2 font-lexend text-lg sm:text-xl">Home</p>
                    <p className="text-white font-lexend text-lg sm:text-xl">Features</p>
                    <p className="text-white font-lexend text-lg sm:text-xl">About</p>
                    <button
                        onClick={handleLoginClick}
                        className="bg-accent-1 rounded-full font-lexend w-[120px] h-14 sm:w-[150px] transform translate-y-[-15px]"
                    >
                        Log In
                    </button>
                </div>
            </div>

            <div className="flex flex-row flex-wrap">
                <div className="max-w-full flex flex-col mr-auto ml-[6vw] sm:ml-[110px] gap-y-7 mt-14">
                    <h1 className="text-white font-lexend text-2xl sm:text-4xl" style={{ fontSize: "3rem" }}>
                        Unlock Your Mind
                        <span className="mr-4"></span>
                        <span className="block mb-4"></span>
                        <GradientText>
                            with Fun, and Challenging <span className="block mb-4"></span>
                            Quizzes!
                        </GradientText>
                    </h1>

                    <p className="text-white">
                        Thinkeroo is the ultimate quiz platform designed to challenge your mind, improve your <br />{" "}
                        knowledge, and entertain you along the way. Whether you're a trivia enthusiast or <br /> looking to
                        sharpen your skills in various subjects, we have something for everyone!
                    </p>
                    <div className="flex flex-row gap-x-4 mt-8">
                        <button className="inline text-accent-1 border p-2 border-accent-1 rounded-full font-lexend w-[120px] sm:w-[150px] transform translate-y-[-15px]">
                            Contact Us
                        </button>
                        <button
                            onClick={handleJoinNowClick}
                            className="inline bg-accent-1 border p-2 border-accent-1 rounded-full font-lexend w-[120px] sm:w-[150px] transform translate-y-[-15px]"
                        >
                            Join Now
                        </button>
                    </div>
                </div>

                <div className="ml-auto mt-[6vw] sm:mt-[10px] max-w-full sm:max-w-m sm:max-h-[100px]">
                    <img src="src/assets/logo.jpg" className="inline w-2xl max-h-[480px] object-cover mr-[80px]" />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
