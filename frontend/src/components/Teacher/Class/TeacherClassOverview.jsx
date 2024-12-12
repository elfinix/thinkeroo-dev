import React, { useState } from 'react'

import TeacherClassOverviewHeader from './TeacherClassOverviewHeader'
import TeacherClassOverviewRender from './TeacherClassOverviewRender'

import TeacherClassQuizScores from '../Quiz/TeacherClassQuizScores'
import TeacherClassOverviewDetailsEdit from './TeacherClassOverviewDetailsEdit'

const TeacherClassOverview = () => {
    const [render, setRender] = useState('Overview');
    const [showQuizScore, setShowQuizScore] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState();
    const [showEditDetails, setShowEditDetails] = useState(false);

    const viewScore = (data) => {
        setShowQuizScore(true);
        setSelectedQuiz(data);
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-start">
            {
                !showQuizScore &&
                <>
                    <TeacherClassOverviewHeader 
                        setRender={setRender}
                        render={render}
                    />
                    <TeacherClassOverviewRender 
                        render={render}
                        viewScore={viewScore}
                        setShowEditDetails={setShowEditDetails}
                    />
                </>
            }
            {
                showQuizScore && 
                    <TeacherClassQuizScores 
                        setShowQuizScore={setShowQuizScore}
                        selectedQuiz={selectedQuiz}
                    />
            }
            {
                showEditDetails && 
                    <TeacherClassOverviewDetailsEdit 
                        setShowEditDetails={setShowEditDetails}
                    />
            }
        </div>
    )
}

export default TeacherClassOverview