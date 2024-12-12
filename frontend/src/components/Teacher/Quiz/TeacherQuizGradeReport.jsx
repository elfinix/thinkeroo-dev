import React from 'react'
import TeacherQuizGradeReportTable from './TeacherQuizGradeReportTable'

const TeacherQuizGradeReport = ({ setShowReport }) => {
    return (
        <div className="w-screen h-screen absolute top-0 left-0 bg-[#00000080] flex items-center justify-center">
            <div className="bg-primary-1 border-2 border-primary-3 rounded-[10px] w-[991px] h-[786px] p-4 px-6">
                <h1 className="font-semibold text-[38px] text-text-1">Grade Report</h1>
                <div>
                    <table className="w-full overflow-x-hidden table-fixed">
                        <col width="30"/>
                        <col width="20"/>
                        <col width="30"/>
                        <col width="20"/>
                        <col width="10"/>
                        <thead>
                            <tr>
                                <th className="w-3/12 text-text-2 pb-[10px] text-start border-b-2 border-0 border-primary-3">Name</th>
                                <th className="w-2/12 text-text-2 pb-[10px] text-start border-b-2 border-0 border-primary-3">Time Taken</th>
                                <th className="w-3/12 text-text-2 pb-[10px] text-start border-b-2 border-0 border-primary-3">Date Submitted</th>
                                <th className="w-2/12 text-text-2 pb-[10px] text-start border-b-2 border-0 border-primary-3">Cheat Status</th>
                                <th className="w-2/12 text-text-2 pb-[10px] text-end border-b-2 border-0 border-primary-3">Score</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="h-[80%] overflow-y-auto overflow-x-hidden">
                    <TeacherQuizGradeReportTable/>
                </div>
                <div className="flex gap-4 w-full justify-center">
                    <button onClick={() => setShowReport(false)} className="border-2 border-text-1 text-text-1 rounded-full bg-transparent w-32 h-[42px]">Close</button>
                    <button className="border-0 bg-accent-1 text-primary-1 rounded-full w-32 h-[42px]">Download</button>
                </div>
            </div>
        </div>
    )
}

export default TeacherQuizGradeReport