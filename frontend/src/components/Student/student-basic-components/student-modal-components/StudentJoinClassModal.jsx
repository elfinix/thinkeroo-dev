import React, { useState, useEffect } from 'react';

function StudentJoinClassModal({ isOpen, onClose, onJoin, modalTitle = 'Join Class' }) {
  const [classCode, setClassCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setClassCode('');
      setError('');
    }
  }, [isOpen]);

  const handleJoin = () => {
    if (!classCode.trim()) {
      setError('Class code cannot be empty.');
    } else if (classCode.trim() !== '1234') { // Simple mock check for an invalid class code, just update the logic
      setError('Invalid class code.');
    } else {
      onJoin();
      onClose();
    }
  };

  const handleInputChange = (e) => {
    setClassCode(e.target.value);
    if (error) {
      setError('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center font-lexend z-50">
      <div className="bg-primary-1 border-2 border-primary-3 rounded-lg shadow-lg w-9/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-6">
        <div className="flex justify-start items-start mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-text-1">{modalTitle}</h2>
        </div>
        <div className="mb-4">
          <div className="relative">
            <label className="block text-sm sm:text-sm font-medium text-text-2 mb-2 mt-3">Class Code</label>
            <input
              type="text"
              placeholder="Enter class code"
              value={classCode}
              onChange={handleInputChange}
              className={`w-full p-2 text-sm sm:text-base border ${error ? 'border-red-600 border-2' : 'border-primary-3 border-2'} rounded-lg focus:outline-none bg-primary-1`}
            />
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2 justify-end text-sm mt-6 sm:mt-8">
          <button
            className="border-2 border-text-1 text-text-1 px-4 py-2 rounded-full hover:opacity-75 font-sm w-[100px] sm:w-[110px] md:w-[114px]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-accent-1 text-primary-1 px-4 py-2 rounded-full hover:bg-accent-2 font-sm w-[100px] sm:w-[110px] md:w-[114px]"
            onClick={handleJoin}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentJoinClassModal;
