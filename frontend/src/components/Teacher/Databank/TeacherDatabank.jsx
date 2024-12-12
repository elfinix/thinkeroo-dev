import React, { useState } from 'react'
import TeacherDatabankMenu from './TeacherDatabankMenu'

const TeacherDatabank = () => {
    const [bankOption, setBankOption] = useState('Choose');

    const renderContent = () => {
        switch(bankOption){
            case 'Choose' :
                return (
                    <div className="w-full h-full flex flex-col justify-between">
                        <div className="flex flex-col w-full">
                            <button onClick={() => setBankOption('Multiple Choice')} className="flex gap-2 items-center h-16 border-0 border-b-2 border-primary-3 p-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 25 25">
                                    <path fill="#F5F5F5" d="M6.184 11.868A5.684 5.684 0 1 1 6.184.5a5.684 5.684 0 0 1 0 11.368Zm0 12.632a5.684 5.684 0 1 1 0-11.368 5.684 5.684 0 0 1 0 11.368Zm12.632-12.632a5.684 5.684 0 1 1 0-11.368 5.684 5.684 0 0 1 0 11.368Zm0 12.632a5.684 5.684 0 1 1 0-11.368 5.684 5.684 0 0 1 0 11.368ZM6.184 9.342a3.158 3.158 0 1 0 0-6.316 3.158 3.158 0 0 0 0 6.316Zm0 12.632a3.158 3.158 0 1 0 0-6.316 3.158 3.158 0 0 0 0 6.316ZM18.816 9.342a3.158 3.158 0 1 0 0-6.316 3.158 3.158 0 0 0 0 6.316Zm0 12.632a3.158 3.158 0 1 0 0-6.316 3.158 3.158 0 0 0 0 6.316Z"/>
                                </svg>
                                <p className="text-text-1">Multiple Choice</p>
                            </button>
                            <button onClick={() => setBankOption('Identification')} className="flex gap-2 items-center h-16 border-0 border-b-2 border-primary-3 p-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path fill="#F5F5F5" d="M2 3v2h2v14H2v2h6v-2H6V5h2V3H2Zm8.2 15h2.154l1.2-3h4.892l1.2 3H21.8L17 6h-2l-4.8 12ZM16 8.885 17.646 13h-3.292L16 8.885Z"/>
                                </svg>
                                <p className="text-text-1">Identification</p>
                            </button>
                            <button onClick={() => setBankOption('True or False')} className="flex gap-2 items-center h-16 border-0 border-b-2 border-primary-3 p-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path fill="#F5F5F5" d="M12 21.997c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10Zm0-2v-16a8 8 0 0 0 0 16Z"/>
                                </svg>
                                <p className="text-text-1">True or False</p>
                            </button>
                        </div>
                    </div>
                )
            case 'Multiple Choice' :
                return (
                    <div className="w-full h-full flex flex-col justify-between overflow-hidden">
                        <div className="w-full h-fit flex items-center mb-6">
                            <button onClick={() => setBankOption('Choose')} type="button" className="flex items-center gap-[10px] text-text-1 font-bold text-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                    <path fill="#F5F5F5" d="M3.828 7H16v2H3.828l5.364 5.364-1.414 1.414L0 8 7.778.222l1.414 1.414L3.828 7Z"/>
                                </svg>
                                Multiple Choice
                            </button>
                        </div>
                        <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
                            <div className="w-full p-4 border-2 border-primary-3 rounded-[10px] relative">
                                <button className="absolute top-0 right-0 m-4 mr-6 flex items-center gap-2 text-negative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path fill="#F93F3F" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3Zm1 2H6v12h12V8Zm-4.586 6 1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14ZM9 4v2h6V4H9Z"/>
                                    </svg>
                                    Delete
                                </button>
                                <p className="font-bold text-xl mb-4">Is the programming language that named after the movie “Monty Python”</p>
                                <div className="flex flex-col w-full gap-2">
                                    <div className="w-full text-center border-2 border-primary-3 text-primary-3 rounded-[10px] p-2">Java</div>
                                    <div className="w-full text-center border-2 border-primary-3 text-primary-3 rounded-[10px] p-2">C++</div>
                                    <div className="w-full text-center border-2 border-primary-3 text-primary-3 rounded-[10px] p-2">C#</div>
                                    <div className="w-full text-center border-2 border-secondary-1 text-secondary-1 rounded-[10px] p-2">Python</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 'True or False' :
                return (
                    <div className="w-full h-full flex flex-col justify-between overflow-hidden">
                        <div className="w-full h-fit flex items-center mb-6">
                            <button onClick={() => setBankOption('Choose')} type="button" className="flex items-center gap-[10px] text-text-1 font-bold text-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                    <path fill="#F5F5F5" d="M3.828 7H16v2H3.828l5.364 5.364-1.414 1.414L0 8 7.778.222l1.414 1.414L3.828 7Z"/>
                                </svg>
                                True or False
                            </button>
                        </div>
                        <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
                            <div className="w-full p-4 border-2 border-primary-3 rounded-[10px] relative">
                                <button className="absolute top-0 right-0 m-4 mr-6 flex items-center gap-2 text-negative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path fill="#F93F3F" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3Zm1 2H6v12h12V8Zm-4.586 6 1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14ZM9 4v2h6V4H9Z"/>
                                    </svg>
                                    Delete
                                </button>
                                <p className="font-bold text-xl mb-4">Sample Question for T or F</p>
                                <div className="flex flex-col w-full gap-2">
                                    <div className="w-full text-center border-2 border-primary-3 text-primary-3 rounded-[10px] p-2">True</div>
                                    <div className="w-full text-center border-2 border-secondary-1 text-secondary-1 rounded-[10px] p-2">False</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 'Identification' :
                return (
                    <div className="w-full h-full flex flex-col justify-between overflow-hidden">
                        <div className="w-full h-fit flex items-center mb-6">
                            <button onClick={() => setBankOption('Choose')} type="button" className="flex items-center gap-[10px] text-text-1 font-bold text-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                    <path fill="#F5F5F5" d="M3.828 7H16v2H3.828l5.364 5.364-1.414 1.414L0 8 7.778.222l1.414 1.414L3.828 7Z"/>
                                </svg>
                                Identification
                            </button>
                        </div>
                        <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
                            <div className="w-full p-4 border-2 border-primary-3 rounded-[10px] relative">
                                <button className="absolute top-0 right-0 m-4 mr-6 flex items-center gap-2 text-negative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path fill="#F93F3F" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3Zm1 2H6v12h12V8Zm-4.586 6 1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14ZM9 4v2h6V4H9Z"/>
                                    </svg>
                                    Delete
                                </button>
                                <p className="font-bold text-xl mb-4">Who are you?</p>
                                <div className="flex flex-col w-full gap-2">
                                    <div className="w-full text-center border-2 border-secondary-1 text-secondary-1 rounded-[10px] p-2">I am Nigger</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-full h-[90%] p-8 text-text-1">
                {renderContent()}
            </div>
        </div>
    )
}

export default TeacherDatabank