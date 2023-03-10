import { combineReducers } from '@reduxjs/toolkit'
import auth from '../authSlice'
import app from '../appSlice'
import bookings from '../bookingSlice'
import clients from '../clientSlice'
import serviceCategory from '../serviceCategorySlice'
import serviceProviders from '../serviceProviderSlice'
import paymentMethods from '../paymentMethodSlice'
import transactions from '../transactionSlice'
import profile from '../profileSlice'
import products from '../productSlice'
import varietyBoxes from '../varietyBoxSlice'
import groups from '../groupSlice'
import customers from '../customerSlice'
import orders from '../orderSlice'
import activities from '../activitySlice'
import subjects from '../subjectSlice'
import learnerClasses from '../LearnerClassSlice'
import learnerAges from '../LearnerAgeSlice'
import courses from '../courseSlice'

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
  products,
  varietyBoxes,
  groups,
  customers,
  orders,
  activities,
  subjects,
  learnerClasses,
  learnerAges,
  courses,
})

export default rootReducer
