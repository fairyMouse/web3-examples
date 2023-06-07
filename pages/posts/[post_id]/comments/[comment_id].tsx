import { useRouter } from 'next/router'

// http://localhost:3000/posts/2/comments/3
export default function PagePostDetail() {
  const router = useRouter()

  const cid = router.query.comment_id
  const pid = router.query.post_id

  return (
    <main>
      <h2>
        post {pid} / Comment {cid} Detail
      </h2>
    </main>
  )
}
