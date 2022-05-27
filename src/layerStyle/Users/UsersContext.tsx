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
  dispatch: (): void => {
    console.log('---dispatch')
  }
}

export enum EnumUsersContextActionType {
  SET_USERS = 'SET_USERS'
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
    case EnumUsersContextActionType.SET_USERS:
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
    <UsersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UsersContext.Provider>
  )
}
