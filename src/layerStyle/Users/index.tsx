import { FC } from 'react'
import { withFetch, withUsersContext, withFetchAndSkeleton2 } from './WithFetch'
interface IProps {
  users: any[]
}
export const Users: FC<IProps> = ({ users }: IProps): JSX.Element => {
  return (
    <>
      <h1>List users:</h1>
      <ul>
        {users.map(
          (user: any, index: number): JSX.Element => (
            <li key={index}>{user.name}</li>
          )
        )}
      </ul>
    </>
  )
}

export const UsersWithFetch: any = withUsersContext(withFetch(Users))
export const UsersWithFetchAndSkeleton: any = withUsersContext(
  withFetchAndSkeleton2(Users)
)
