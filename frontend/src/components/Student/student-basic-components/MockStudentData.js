export const initialStudentData = [
  {
    studentId: 'STUDENT-00001',
    personalDetail: {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe123',
      role: 'Student',
      pronouns: 'He/Him',
      image: 'https://storage.googleapis.com/a1aa/image/Vr0prY0aKr4kNBVcevcGEP6EKcUg0sZMnq0c4G4BJztyefwnA.jpg' 
    },
    institutionDetail: {
      institution: 'Example University',
      email: 'johndoe@example.com',
      password: 'password123'
    }
  },
];

export const initialQuizData = [
  {
    quizId: 'QUIZ-00001',
    subject: 'Web System Technology 3',
    classId: 'CLASS-00001',
    quiz: 'WST3 - Quiz 1: Django',
    timeLimit: '60 min',
    items: '100',
    date: '12-01-2024',
    startTime: '08:00',
    accomplishedDate: '12-01-2024',
    accomplishedTime: '08:41'
  },
  {
    quizId: 'QUIZ-00002',
    subject: 'System AdminisTration and Maintenance',
    classId: 'CLASS-00003',
    quiz: 'SAM - DHCP Quiz',
    timeLimit: '60 min',
    items: '60',
    date: '12-06-2024',
    startTime: '07:00',
    accomplishedDate: '12-06-2024',
    accomplishedTime: '07:41'
  },
  {
    quizId: 'QUIZ-00003',
    subject: 'Gender and Society',
    classId: 'CLASS-00004',
    quiz: 'GenSoc - Theories on Gender Quiz',
    timeLimit: '30 min',
    items: '30',
    date: '12-08-2024',
    startTime: '14:00',
    accomplishedDate: '12-06-2024',
    accomplishedTime: '14:24'
  },
  {
    quizId: 'QUIZ-00004',
    subject: 'Web System Technology 3',
    classId: 'CLASS-00001',
    quiz: 'WST3 - Quiz 2: OOP',
    timeLimit: '40 min',
    items: '30',
    date: '12-09-2024',
    startTime: '09:00',
    accomplishedDate: '12-09-2024',
    accomplishedTime: '09:36'
  },
];

export const initialClassData = [
  {
    classId: 'CLASS-00001',
    subject: 'Web System Technology 3',
    classCode: 'utv-axv-vju',
    classImg: 'https://img.freepik.com/free-vector/engineer-developer-with-laptop-tablet-code-cross-platform-development-cross-platform-operating-systems-software-environments-concept-pinkish-coral-bluevector-isolated-illustration_335657-2524.jpg?semt=ais_hybrid',
    students: [
      {
        studentId: 'STUDENT-00001',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe123',
        email: 'johndoe@example.com',
        role: 'Student',
        status: 'Enrolled', // Active status for student
        profileImage: 'https://via.placeholder.com/100',
      },
      {
        studentId: 'STUDENT-00002',
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'janesmith456',
        email: 'janesmith@example.com',
        role: 'Student',
        status: 'Enrolled',
        profileImage: 'https://via.placeholder.com/100',
      },
    ]
  },
  {
    classId: 'CLASS-00002',
    subject: 'Capstone 2',
    classCode: 'bnj-scn-rob',
    classImg: 'https://img.freepik.com/free-vector/designers-are-working-desing-web-page-web-design-user-interface-user-experience-content-organization_335657-4403.jpg',
    students: [
      {
        studentId: 'STUDENT-00001',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe123',
        email: 'johndoe@example.com',
        role: 'Student',
        status: 'Enrolled', // Active status for student
        profileImage: 'https://via.placeholder.com/100',
      },
      {
        studentId: 'STUDENT-00002',
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'janesmith456',
        email: 'janesmith@example.com',
        role: 'Student',
        status: 'Enrolled',
        profileImage: 'https://via.placeholder.com/100',
      },
    ]
  }
];

export const initialQuestionsData = [
  {
    questionId: 'Q-00001',
    question: 'Python is a statically typed language.',
    classId: 'CLASS-00001',
    type: 'true_or_false',
    options: ['True', 'False'],
    noOfAnswer: 1,
    required: "true",
    correctAnswer: 'False',
    studentAnswer:'False'
  },
  {
    questionId: 'Q-00002',
    question: 'Which of the following is used to define a function in Python?',
    classId: 'CLASS-00001',
    type: 'multiple_choice',
    options: ['def', 'function', 'func', 'lambda'],
    noOfAnswer: 1,
    required: "false",
    correctAnswer: 'def',
    studentAnswer:'func' 
  },

  {
    questionId: 'Q-00003',
    question: 'Which of the following are valid Python data structures?',
    classId: 'CLASS-00001',
    type: 'select_multiple',
    options: ['List', 'Array', 'Dictionary', 'Tuple'],
    noOfAnswer: 2,
    required: "true",
    correctAnswer: ['List', 'Dictionary'],
    studentAnswer:['Array','Dictionary']
  },
  {
    questionId: 'Q-00004',
    question: 'What keyword is used to create a loop that runs indefinitely in Python?',
    classId: 'CLASS-00001',
    type: 'short_answer',
    noOfAnswer: null,
    required: "true",
    correctAnswer: 'while',
    studentAnswer:'while',
  }
];
