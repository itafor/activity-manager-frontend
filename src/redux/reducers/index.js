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
import activities from '../activitySlice'
import subjects from '../subjectSlice'
import learnerClasses from '../LearnerClassSlice'
import learnerAges from '../LearnerAgeSlice'
import courses from '../courseSlice'
import categories from '../categorySlice'
import companies from '../companySlice'
import insurances from '../InsuranceSlice'
import lessons from '../lessonSlice'
import claims from '../claimSlice'
import users from '../userSlice'
import orders from '../orderSlice'
import payments from '../paymentSlice'
import contacts from '../supportSlice'

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
  activities,
  subjects,
  learnerClasses,
  learnerAges,
  courses,
  categories,
  companies,
  insurances,
  lessons,
  claims,
  users,
  orders,
  payments,
  contacts,
})

export default rootReducer
