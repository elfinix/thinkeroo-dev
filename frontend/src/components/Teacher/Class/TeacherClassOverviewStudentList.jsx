import React, { useState } from "react";
import axios from "axios";
import TeacherClassStudentListItem from "./TeacherClassStudentListItem";
import TeacherClassInviteStudent from "./TeacherClassInviteStudent";
import { API_ENDPOINT } from "/constants/constants";
import { getClassSelector } from "/src/global/globals";

const TeacherClassOverviewStudentList = ({ studentList, setStudentList, totalStudents }) => {
    const [invite, setInvite] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null); // State to track the selected student
    const [searchQuery, setSearchQuery] = useState(""); // State to track the search query

    // Filter the student list based on the search query
    const filteredStudentList = studentList.filter((student) =>
        `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const classId = getClassSelector();

    const handleDeleteStudent = async (studentId) => {
        try {
            await axios.put(`${API_ENDPOINT}/api/user-class/${studentId}/${classId}/update_status/`, {
                status: "removed",
            });
            setStudentList((prevList) => prevList.filter((student) => student.id !== studentId));
        } catch (error) {
            console.error("Failed to delete student:", error);
        }
    };

    return (
        <>
            <div className="w-full flex flex-col h-[90%] pb-8">
                <div className="w-full h-[42px] flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search Student"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state on change
                        className="w-[502px] text-text-1 focus:outline-text-1 placeholder:text-text-2 placeholder:font-medium h-[42px] px-4 rounded-[10px] border-2 border-primary-3 bg-transparent"
                    />
                </div>
                <div className="w-full h-[90%] flex gap-4">
                    <div className="w-full h-full border-2 border-primary-3 rounded-[10px] p-5">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-medium text-text-1">Student List</h2>
                            <h2 className="text-xl font-medium text-text-2">
                                {filteredStudentList.length}/{totalStudents}
                            </h2>
                        </div>
                        <div className="w-full h-[92%] overflow-y-auto">
                            {filteredStudentList.map((student) => (
                                <TeacherClassStudentListItem
                                    key={student.id}
                                    student={student}
                                    onClick={() => setSelectedStudent(student)} // Handle click event
                                    onDelete={handleDeleteStudent} // Handle delete event
                                />
                            ))}
                        </div>
                    </div>

                    <div className="w-[300px] border-2 border-primary-3 rounded-[10px] p-5 flex flex-col gap-5">
                        <h2 className="text-xl font-medium text-text-1">Student Details</h2>
                        {selectedStudent ? (
                            <>
                                <img
                                    className="w-[125px] h-[125px] object-cover object-center rounded-full mx-auto"
                                    src={selectedStudent.profile_picture || "https://placehold.co/50x50"}
                                    alt=""
                                />
                                <div className="flex flex-col gap-2">
                                    <p className="text-text-2">First Name</p>
                                    <h4 className="text-text-2 bg-primary-3 p-2 px-4 rounded-[10px]">
                                        {selectedStudent.first_name}
                                    </h4>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-text-2">Last Name</p>
                                    <h4 className="text-text-2 bg-primary-3 p-2 px-4 rounded-[10px]">
                                        {selectedStudent.last_name}
                                    </h4>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-text-2">Date Added</p>
                                    <h4 className="text-text-2 bg-primary-3 p-2 px-4 rounded-[10px]">
                                        {selectedStudent.join_date
                                            ? new Date(selectedStudent.join_date).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                              })
                                            : "N/A"}
                                    </h4>
                                </div>
                            </>
                        ) : (
                            <p className="text-text-2">Select a student to see details</p>
                        )}
                    </div>
                </div>
            </div>
            {invite && <TeacherClassInviteStudent setInvite={setInvite} />}
        </>
    );
};

export default TeacherClassOverviewStudentList;
