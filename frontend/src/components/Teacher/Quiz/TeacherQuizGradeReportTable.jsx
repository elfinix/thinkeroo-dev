import React from "react";

const TeacherQuizGradeReportTable = ({ studentScores = [] }) => {
    return (
        <table className="w-full overflow-x-hidden table-fixed">
            <colgroup>
                <col width="30" />
                <col width="20" />
                <col width="30" />
                <col width="20" />
                <col width="10" />
            </colgroup>
            <tbody>
                {studentScores.map((studentScore) => (
                    <tr key={studentScore.student_id} className="border-b-2 border-0 border-primary-3 w-full">
                        <td className="overflow-hidden text-ellipsis whitespace-nowrap text-start h-[62px] items-center text-text-1">
                            {studentScore.student_name}
                        </td>
                        <td className="overflow-hidden text-ellipsis whitespace-nowrap text-start h-[62px] items-center text-text-2">
                            {studentScore.time_taken} minutes
                        </td>
                        <td className="overflow-hidden text-ellipsis whitespace-nowrap text-start h-[62px] items-center text-text-2">
                            {new Date(studentScore.time_finished).toLocaleDateString("en-US", { timeZone: "UTC" })} |{" "}
                            {new Date(studentScore.time_finished).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZone: "UTC",
                            })}
                        </td>
                        <td className="overflow-hidden text-ellipsis whitespace-nowrap text-start h-[62px] items-center text-positive">
                            {studentScore.cheat_status ? studentScore.cheat_status : "None detected"}
                        </td>
                        <td className="overflow-hidden text-ellipsis whitespace-nowrap text-end h-[62px] items-center text-text-2">
                            {studentScore.score}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TeacherQuizGradeReportTable;
