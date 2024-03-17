import Login from "./pages/Login";
import PersonInfo from "./pages/PersonInfo";
import ExamSelect from "./pages/ExamSelect";
import Exam from "./pages/Exam";
import ExamHistory from "./pages/ExamHistory";
import ReadExam from "./pages/ReadExam";
import CorrectExamList from "./pages/CorrectExamList";
import CorrectExam from "./pages/CorrectExam";
import StudentManage from "./pages/StudentManage";
import SubjectManage from "./pages/SubjectManage";
import SubjectAdd from "./pages/SubjectAdd";
import AdminManage from "./pages/AdminManage";

export const routesConfig = [
  {
    path: '/login',
    component: <Login />,
    showMenu: false,
  },
  {
    path: '/person_info',
    component: <PersonInfo />,
    showMenu: false,
  },
  {
    path: '/exam_select',
    component: <ExamSelect />,
    showMenu: true,
  },
  {
    path: '/exam/:exam_id',
    component: <Exam />,
    showMenu: true,
  },
  {
    path: '/exam_history',
    component: <ExamHistory />,
    showMenu: true,
  },
  {
    path: '/read_exam',
    component: <ReadExam />,
    showMenu: true,
  },
  {
    path: '/corret_exam_list',
    component: <CorrectExamList />,
    showMenu: false,
  },
  {
    path: '/corret_exam',
    component: <CorrectExam />,
    showMenu: true,
  },
  {
    path: '/student_manage',
    component: <StudentManage />,
    showMenu: true,
  },
  {
    path: '/subject_manage',
    component: <SubjectManage />,
    showMenu: true,
  },
  {
    path: '/subject_add',
    component: <SubjectAdd />,
    showMenu: true,
  },
  {
    path: '/admin_manage',
    component: <AdminManage />,
    showMenu: true,
  },
];
