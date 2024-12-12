import React, { useState } from 'react'
import TeacherClassHeader from './TeacherClassHeader'
import TeacherClassList from './TeacherClassList'
import TeacherCreateClass from './TeacherCreateClass'
import ClassOverview from './TeacherClassOverview'

const TeacherClass = () => {
    const [showCreateClass, setShowCreateClass] = useState(false);
    const [selectedClass, setSelectedClass] = useState();
    const [showOverview, setShowOverview] = useState(false);
    
    return (
        <div className="w-full h-full flex flex-col items-center">
            {!showOverview &&
                <>
                    <TeacherClassHeader 
                    setShowCreateClass={setShowCreateClass}
                    />
                    <TeacherClassList 
                        setSelectedClass={setSelectedClass}
                        setShowOverview={setShowOverview}
                    />
                </>
            }
            {showOverview &&
                <ClassOverview/>
            }

            {showCreateClass && 
                <TeacherCreateClass 
                    setShowCreateClass={setShowCreateClass}
                />
            }
        </div>
    )
}

export default TeacherClass