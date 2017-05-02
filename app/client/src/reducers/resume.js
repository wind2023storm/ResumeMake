import {
  SELECT_TEMPLATE,
  ADD_SCHOOL,
  REMOVE_SCHOOL,
  ADD_JOB,
  REMOVE_JOB,
  INCREMENT_JOB_DUTY,
  DECREMENT_JOB_DUTY,
  ADD_PROJECT,
  REMOVE_PROJECT,
  SET_RESUME_URL
} from '../constants'

const initialState = {
  selectedTemplate: 3,
  schoolCount: 1,
  jobCount: 1,
  jobDuties: [1],
  projectCount: 1,
  resumeURL: null
}

function resume(state = initialState, action) {
  switch (action.type) {
    case SELECT_TEMPLATE:
      return {
        ...state,
        selectedTemplate: action.templateId
      }

    case ADD_SCHOOL:
      return {
        ...state,
        schoolCount: state.schoolCount + 1
      }

    case REMOVE_SCHOOL:
      return {
        ...state,
        schoolCount: (state.schoolCount > 1) ? state.schoolCount - 1 : 1
      }

    case ADD_JOB:
      return {
        ...state,
        jobCount: state.jobCount + 1,
        jobDuties: [...state.jobDuties, 1]
      }

    case REMOVE_JOB:
      return {
        ...state,
        jobCount: (state.jobCount > 1) ? state.jobCount - 1 : 1,
        jobDuties: (state.jobCount > 1) ? state.jobDuties.slice(0, state.jobDuties.length - 1) : [1]
      }

    case INCREMENT_JOB_DUTY:
      return {
        ...state,
        jobDuties: [
          ...state.jobDuties.slice(0, action.index),
          state.jobDuties[action.index] + 1,
          ...state.jobDuties.slice(action.index + 1)
        ]
      }

    case DECREMENT_JOB_DUTY:
      return {
        ...state,
        jobDuties: [
          ...state.jobDuties.slice(0, action.index),
          (state.jobDuties[action.index] > 1) ? state.jobDuties[action.index] - 1 : 1,
          ...state.jobDuties.slice(action.index + 1)
        ]
      }

    case ADD_PROJECT:
      return {
        ...state,
        projectCount: state.projectCount + 1
      }

    case REMOVE_PROJECT:
      return {
        ...state,
        projectCount: (state.projectCount > 1) ? state.projectCount - 1 : 1
      }

    case SET_RESUME_URL:
      return {
        ...state,
        resumeURL: action.url
      }

    default:
      return state
  }
}

export default resume
