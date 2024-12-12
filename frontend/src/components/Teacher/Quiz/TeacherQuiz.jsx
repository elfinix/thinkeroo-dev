import React, { useState } from 'react'
import TeacherQuizList from './QuizRender/TeacherQuizList'
import TeacherQuizCreate from './QuizRender/TeacherQuizCreate'

const TeacherQuiz = () => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showSelected, setShowSelected] = useState(false);

    const selectQuiz = (data) => {
        setSelectedQuiz(data);
        setShowSelected(true);
    }

    const unselectQuiz = () => {
        setShowSelected(false);
        setSelectedQuiz(null);
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            {!showSelected && 
                <TeacherQuizList 
                    selectQuiz={selectQuiz}
                />
            }
            {showSelected && 
                <TeacherQuizCreate 
                    selectedQuiz={selectedQuiz}
                    unselectQuiz={unselectQuiz}
                />
            }
            
        </div>
    )
}

export default TeacherQuiz