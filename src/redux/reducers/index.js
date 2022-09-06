import { combineReducers } from "@reduxjs/toolkit";
import auth from "../authSlice";
import app from "../appSlice";
import appointment from "../appointmentSlice";
import patient from "../patientSlice";
import payment from "../paymentSlice";
// import chat from "../chatSlice";
import subscription from "../subscriptionSlice";
import profile from "../profileSlice";
import physician from "../physicianSlice";

const rootReducer = combineReducers({
  auth,
  app,
  appointment,
  patient,
  payment,
  // chat,
  subscription,
  profile,
  physician,
});

export default rootReducer;
