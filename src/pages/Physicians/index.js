import { lazy } from "react";

const Physicians = lazy(() => import("./Physicians"));
export const PhysicianInfo = lazy(() => import("./PhysicianInfo"));

export default Physicians;
