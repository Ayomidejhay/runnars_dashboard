


'use client'

import React, { useMemo } from 'react'
import { useParams } from 'next/navigation'
import PostDetails from './PostDetails'
import { useChallengePosts, useChallengePost } from '@/hooks/useAnalyticsChallenge'

export default function PostsTab() {
  // const params = useParams()
  // const id = params.id as string
  const {id} = useParams()

  const { data, isLoading } = useChallengePosts(id as any, {
    page: 1,
    limit: 1000, // fetch all for analytics summary
  })

  // const {data, isLoading} = useChallengePost(challengeId)

  const posts = data?.data?.posts ?? []

  // ✅ Compute analytics
  const stats = useMemo(() => {
    const total = posts.length
    const photos = posts.filter((p: any) => p.type === "image" || p.media?.length > 0).length
    const videos = posts.filter((p: any) => p.type === "video").length

    const photoPercent = total ? ((photos / total) * 100).toFixed(1) : "0"
    const videoPercent = total ? ((videos / total) * 100).toFixed(1) : "0"

    return { total, photos, videos, photoPercent, videoPercent }
  }, [posts])

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Total Posts",
            value: stats.total,
            subtitle: "",
          },
          {
            title: "Photo",
            value: stats.photos,
            subtitle: `${stats.photoPercent}% of total`,
          },
          {
            title: "Video",
            value: stats.videos,
            subtitle: `${stats.videoPercent}% of total`,
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-1 mt-6"
          >
            <div className="flex justify-between items-center text-sm text-gray">
              <span>{item.title}</span>
            </div>

            <div className="text-2xl font-bold text-deepblue">
              {isLoading ? "0" : item.value}
            </div>

            <p className="text-xs text-[#40B773] flex items-center">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Posts Table */}
      <PostDetails />
    </div>
  )
}
