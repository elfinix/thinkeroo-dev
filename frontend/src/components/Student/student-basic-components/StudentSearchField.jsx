import React, { useState } from 'react';
import { Search } from 'lucide-react';

const StudentSearchField = ({ value = '', placeholder = 'Search', onChange = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState(value);

  const handleChange = (value) => {
    setSearchQuery(value);
    onChange(value); // Optional: pass up the value to parent if needed
  };

  return (
    <div className="fixed top-0 right-10 mt-4 mr-4 md:mr-20 py-2 z-[50]">
      <div className="relative w-80">
        <div className="flex items-center bg-primary-1 border-2 border-primary-3 rounded-xl px-4 py-2 w-full font-lexend">
          <Search className="text-primary-3" />
          <input
            type="text"
            placeholder={placeholder}
            className="ml-2 outline-none text-primary-3 placeholder-primary-3 bg-transparent w-full"
            value={searchQuery}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentSearchField;
