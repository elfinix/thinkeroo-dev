import React from 'react'

const TeacherClassOverviewDetails = ({ setShowEditDetails }) => {
    const handleCopy = () => {
        const textToCopy = document.getElementById('copy-text').textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Text copied to clipboard!');
        }).catch((err) => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <div className="w-[277px] h-[323px] border-2 p-4 border-solid border-primary-3 rounded-[10px]">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[20px] font-medium text-text-1">Class Details</p>
                <button onClick={() => setShowEditDetails(true) } className="w-6 h-6 overflow-hidden cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="#F5F5F5" d="M6.414 15.89 16.556 5.748l-1.414-1.414L5 14.476v1.414h1.414Zm.829 2H3v-4.243L14.435 2.212a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 17.89ZM3 19.89h18v2H3v-2Z"/>
                    </svg>
                </button>
            </div>
            <p className="text-text-2">Class Code</p>
            <div className="flex items-center justify-between mb-3">
                <p id="copy-text" className="text-text-1 text-xl">XXX-XXX-XXX</p>
                <button onClick={handleCopy} className="w-6 h-6 overflow-hidden cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="#F5F5F5" d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.006-1H7ZM5.002 8 5 20h10V8H5.002ZM9 6h8v10h2V4H9v2Z"/>
                    </svg>
                </button>
            </div>
            <p className="text-text-2">Class Limit</p>
            <p className="text-xl text-text-1 mb-3">30</p>
            <p className="text-text-2">Student Count</p>
            <p className="text-xl text-text-1 mb-3">27</p>
            <p className="text-text-2">Created</p>
            <p className="text-xl text-text-1 mb-3">11/27/2024</p>
        </div>
    )
}

export default TeacherClassOverviewDetails