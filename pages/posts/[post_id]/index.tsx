import RouterButton from '@/components/RouterButton'
import { useRouter } from 'next/router'

export default function PostDetailPage(props: {
  dt: string
  post_id: string
  data: any
}) {
  const router = useRouter()

  if (router.isFallback) {
    return <h2 className="text-lg font-bold">loading</h2>
  } else {
    const { dt, post_id, data } = props
    return (
      <main className="flex flex-col items-center">
        <h2 className="mt-6 text-xl font-bold">{post_id}</h2>
        <h2 className="mt-6 text-xl font-bold">{data?.title}</h2>
        <RouterButton />
        <h4 className="my-4 text-sm">{dt}</h4>
        <p className="w-[80%]">{data?.body}</p>
      </main>
    )
  }
}

export async function getStaticPaths() {
  // 可以通过在这里先获取所有list数据进而生成完整的paths配置，不过就是一次性生成的有点多
  const res = await fetch('https://dummyjson.com/posts')
  const data = await res.json()
  return {
    // 每个配置path都会生成对应的一个html；配置2个url的path参数
    paths: [{ params: { post_id: '1' } }, { params: { post_id: '2' } }],
    // paths: data.posts.map((item: any) => {
    //   return {
    //     params: { post_id: item.id.toString() }
    //   }
    // }),
    fallback: false // 如果匹配不到，false就没处理，走404
    // fallback: 'blocking' // 按需构建
    // fallback: true // 构建中，给loading反馈
  }
}

export async function getStaticProps(context: any) {
  // const router = useRouter()
  // const post_id = router.query.post_id
  const post_id = context.params.post_id

  const dt = new Date().toString()
  let data = null

  if (post_id) {
    const res = await fetch(`https://dummyjson.com/posts/${post_id}`)
    data = await res.json()
  }
  return {
    props: {
      dt,
      post_id,
      data
    },
    revalidate: 30
  }
}
