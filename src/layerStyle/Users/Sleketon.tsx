import { FC } from 'react'
import { Skeleton as AntdSkeleton } from 'antd'

export const Skeleton: FC = (): JSX.Element => {
  return (
    <>
      <AntdSkeleton paragraph={{ rows: 4 }} />
    </>
  )
}
