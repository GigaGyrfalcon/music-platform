import { z } from 'zod'

export const PlaylistSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  branch_id: z.number(),
})

export type Playlist = z.infer<typeof PlaylistSchema>
