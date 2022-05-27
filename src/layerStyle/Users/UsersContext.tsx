import { FC, createContext, Dispatch, useReducer } from 'react'

export interface ContextStateType {
  state: {
    users: any[]
  }

  dispatch: Dispatch<any>
}
export const initialUsersContextState: ContextStateType = {
  state: {
    users: []
  },
  dispatch: (): void => {}
}

export enum EnumUsersContextActionType {
  SET_USER = 'SET_USER'
}

export interface EnumUsersContextAction {
  type: EnumUsersContextActionType
  payload: any
}

export function usersContextReducer(
  state: ContextStateType,
  action: EnumUsersContextAction
): ContextStateType {
  switch (action.type) {
    case EnumUsersContextActionType.SET_USER:
      return {
        ...state,
        state: {
          ...state.state,
          users: action.payload
        }
      }
    default:
      return state
  }
}

export const UsersContext: any = createContext(initialUsersContextState)

export const UsersWithContext: FC<any> = ({ children }: any): JSX.Element => {
  const [state, dispatch] = useReducer(
    usersContextReducer,
    initialUsersContextState
  )

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  )
}
