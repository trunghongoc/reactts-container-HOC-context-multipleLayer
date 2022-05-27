import { useState, useEffect, useMemo, useContext, useCallback } from 'react'
import axios from 'axios'
import { WithSkeleton } from './WithSkeleton'
import {
  UsersContext,
  UsersWithContext,
  EnumUsersContextActionType
} from './UsersContext'

export const withFetch: any =
  (Component: any): any =>
  (withFetchProps: any): JSX.Element => {
    const [, setIsFetching] = useState<boolean>(true)
    const [users, setUsers] = useState<any[]>([])

    useEffect((): void => {
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response: any): void => {
          setIsFetching(false)
          setUsers(response.data)
        })
    }, [])

    return <Component {...withFetchProps} users={users} />
  }

export const withFetchAndSkeleton: any =
  (Component: any): any =>
  (withFetchProps: any): JSX.Element => {
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [users, setUsers] = useState<any[]>([])

    const UserSkeleton: any = useMemo((): any => WithSkeleton(Component), [])

    useEffect((): void => {
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response: any): void => {
          setIsFetching(false)
          setUsers(response.data)
        })
    }, [])

    return (
      <UserSkeleton {...withFetchProps} users={users} isFetching={isFetching} />
    )
  }

export const withUsersContext: any =
  (Component: any): any =>
  (withFetchProps: any): JSX.Element => {
    return (
      <UsersWithContext>
        <Component {...withFetchProps} />
      </UsersWithContext>
    )
  }

export const withFetchAndSkeleton2: any =
  (Component: any): any =>
  (withFetchProps: any): JSX.Element => {
    const { dispatch }: any = useContext(UsersContext)

    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [users, setUsers] = useState<any[]>([])

    const UserSkeleton: any = useMemo((): any => WithSkeleton(Component), [])

    const fetchUsers = useCallback((): void => {
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response: any): void => {
          setIsFetching(false)
          setUsers(response.data)

          dispatch({
            type: EnumUsersContextActionType.SET_USERS,
            payload: response.data
          })
        })
    }, [dispatch])

    useEffect((): void => {
      fetchUsers()
    }, [fetchUsers])

    return (
      <UserSkeleton {...withFetchProps} users={users} isFetching={isFetching} />
    )
  }
