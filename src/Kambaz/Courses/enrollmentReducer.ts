// import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";
// import { enrollments } from "../Database";
// const initialState = {
//      enrollments: enrollments,
// };
// const saveEnrollments = (enrollments: any) => {
//      localStorage.setItem("enrollments", JSON.stringify(enrollments));
//    };
// const coursesEnrollSlice = createSlice({
//   name: "enrollment",
//   initialState,
//   reducers: {
//     addEnrollment: (state, { payload: enrollment }) => {
//       const newEnrollment: any = {
//         _id: uuidv4(),
//         course: enrollment.course,
//         user: enrollment.user,
        
//       };
//       state.enrollments = [...state.enrollments, newEnrollment] as any;
//       saveEnrollments(state.enrollments);
//     },
//     deleteEnrollment: (state, { payload: courseId }) => {
//       state.enrollments = state.enrollments.filter(
//         (m: any) => m._id !== courseId);
//     },
// //     updateEnrollment: (state, { payload: course }) => {
// //       state.courses = state.courses.map((m: any) =>
// //         m._id === course._id ? course : m
// //       ) as any;
// //     },
//   },
// });
// export const { addEnrollment, deleteEnrollment } =
// coursesEnrollSlice.actions;
// export default coursesEnrollSlice.reducer;
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";

// const initialState = {
//   enrollments: [] as any[], 
// };

// const enrollmentsSlice = createSlice({
//   name: "enrollment",
//   initialState,
//   reducers: {
//     setEnrollments: (state, action: PayloadAction<any[]>) => {
//       state.enrollments = action.payload;
//     },
//     addEnrollment: (state, action: PayloadAction<{ course: any; user: any }>) => {
//       const newEnrollment = {
//         _id: uuidv4(),
//         course: action.payload.course,
//         user: action.payload.user,
//       };
//       state.enrollments.push(newEnrollment);
//     },
//     deleteEnrollment: (state, action: PayloadAction<any>) => {
//       state.enrollments = state.enrollments.filter(
//         (enrollment) => enrollment._id !== action.payload
//       );
//     },
//   },
// });

// export const { setEnrollments, addEnrollment, deleteEnrollment } = enrollmentsSlice.actions;
// export default enrollmentsSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
     enrollments: enrollments,
};
const saveEnrollments = (enrollments: any) => {
     localStorage.setItem("enrollments", JSON.stringify(enrollments));
};
const coursesEnrollSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<any[]>) => {
            state.enrollments = action.payload;
            
          },
    addEnrollment: (state, { payload: enrollment }) => {
      const newEnrollment: any = {
        _id: uuidv4(),
        course: enrollment.course,
        user: enrollment.user,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
      saveEnrollments(state.enrollments);
    },
    deleteEnrollment: (state, { payload: courseId }) => {
      state.enrollments = state.enrollments.filter(
        (m: any) => m._id !== courseId);
    },
  },
});
export const { setEnrollments, addEnrollment, deleteEnrollment } =
coursesEnrollSlice.actions;
export default coursesEnrollSlice.reducer;