import { lazy } from "react";

const Patients = lazy(() => import("./Patients"));
export const PatientInfo = lazy(() => import("./PatientInfo"));

export default Patients;
