import React from 'react'

const TeacherQuizGradeReportTable = () => {
    return (
        <table className="w-full overflow-x-hidden table-fixed">
            <col width="30"/>
            <col width="20"/>
            <col width="30"/>
            <col width="20"/>
            <col width="10"/>
            <tbody>
                <tr className="border-b-2 border-0 border-primary-3 w-full">
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap text-start h-[62px] items-center text-text-1">
                        Adolf Niggler
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap text-start h-[62px] items-center text-text-2">
                        45 Minutes
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap text-start h-[62px] items-center text-text-2">
                        10/12/2024 | 4:00 PM
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap text-start h-[62px] items-center text-negative">
                        Detected: Alt + Tab
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap text-end h-[62px] items-center text-text-2">
                        90
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default TeacherQuizGradeReportTable