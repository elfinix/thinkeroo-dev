import React from 'react'

const TeacherDatabankMenu = () => {
    return (
        <div className="w-full h-[90%] p-8">
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
        </div>
    )
}

export default TeacherDatabankMenu