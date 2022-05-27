import { Skeleton } from './Sleketon'

export const WithSkeleton: any =
  (Component: any): any =>
  (skeletonProps: any): JSX.Element => {
    return (
      <div>
        <h1>With skeleton</h1>
        {skeletonProps.isFetching && <Skeleton />}
        {!skeletonProps.isFetching && <Component {...skeletonProps} />}
      </div>
    )
  }
