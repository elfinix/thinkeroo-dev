import React, { useState, useEffect, useRef } from 'react';

const StudentFilterModal = ({ sortOptions, filterOptions, closeModal }) => {
    const [sortOrder, setSortOrder] = useState(sortOptions[0].value);
    const [filterBy, setFilterBy] = useState(filterOptions[0].value);
    const modalRef = useRef(null);

    const handleClearFilters = () => {
        setSortOrder(sortOptions[0].value);
        setFilterBy(filterOptions[0].value);
    };

    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div
            ref={modalRef}
            className="fixed z-50 border-primary-3 border-2 bg-primary-1 mt-8 text-text-1 p-4 rounded-lg w-64 sm:w-72 md:w-72 lg:w-[300px] xl:w-[300px] font-lexend"
        >
            <div className="mb-4">
                <label htmlFor="sort-by" className="block text-xs sm:text-sm font-medium text-text-2">Sort by</label>
                <select
                    id="sort-by"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border-2 border-primary-3 bg-primary-1 text-text-1 rounded-md shadow-sm focus:outline-none focus:border-secondary-1 text-xs sm:text-sm"
                >
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="filter-by" className="block text-xs sm:text-sm font-medium text-text-2">Filter by</label>
                <select
                    id="filter-by"
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border-2 border-primary-3 bg-primary-1 text-text-1 rounded-md shadow-sm focus:outline-none focus:border-secondary-1 text-xs sm:text-sm"
                >
                    {filterOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleClearFilters}
                className="text-red-500 border-2 border-red-500 hover:opacity-75 py-2 px-4 rounded-lg mt-3 text-xs sm:text-sm w-full"
            >
                Clear Filters
            </button>
        </div>
    );
};

export default StudentFilterModal;
