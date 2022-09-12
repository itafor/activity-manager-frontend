import { combineReducers } from "@reduxjs/toolkit";
import auth from "../authSlice";
import app from "../appSlice";
import bookings from '../bookingSlice'
import clients from '../clientSlice'
import serviceCategory from '../serviceCategorySlice'
import serviceProviders from "../serviceProviderSlice";
import paymentMethods from "../paymentMethodSlice";
import transactions from "../transactionSlice";
import profile from "../profileSlice";




const rootReducer = combineReducers({
  auth,
  app,
  bookings,
  clients,
  serviceCategory,
  serviceProviders,
  paymentMethods,
  transactions,
  profile,
});

export default rootReducer;
