import RouterButton from '@/components/RouterButton'
import Link from 'next/link'

type IPostListProps = {
  dt: string
  postList: any[]
}

// getStaticProps的返回值会作为这里的props参数
export default function PostListPage(props: IPostListProps) {
  console.log('render')
  const { dt, postList } = props

  return (
    <main className="flex flex-col items-center">
      <h2 className="mt-6 text-xl">Post List Page</h2>
      <h4 className="my-4 text-sm">{dt}</h4>
      <RouterButton />

      <ul>
        {postList.map(item => {
          return (
            <li key={item.id}>
              <Link href={`/posts/${item.id}`}>{item.title}</Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

//
/**
 * 构建过程nextJS会调用这个函数 => 拿到props => 调用上面的函数组件 => 得到渲染后的静态页面
 * yarn dev：build、start流程都会走，并且每次刷新都会走一遍
 * yarn build+start: getStaticProps只会在build的时候走一次
 */
export async function getStaticProps() {
  console.log('getStaticProps')
  const dt = new Date().toString()

  const res = await fetch('https://dummyjson.com/posts')
  const data = await res.json()

  return {
    props: {
      dt,
      postList: data.posts
    },
    revalidate: 30
  }
}
