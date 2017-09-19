/**
 * @flow
 */

import type { Dispatch as ReduxDispatch } from 'redux'
import type { FormState, FormAction } from '../features/form/types'
import type {
  TemplatesState,
  TemplatesAction
} from '../features/templates/types'

type State = {
  form: {
    resume: FormState
  },
  templates: TemplatesState
}

type GetState = () => State
type Action = TemplatesAction | FormAction
type Dispatch = ReduxDispatch<Action>
type AsyncAction = (dispatch: Dispatch, getState: GetState) => any

export type { State, Dispatch, Action, AsyncAction }
