import { z } from 'zod'

export const IOSBuildResult = z.object({
  type: z.enum(['ios']),
  name: z.string(),
  version: z.string(),
  build_number: z.number(),
  archive_artifact_url: z.string(),
  testflight_upload_succeeded: z.boolean()
})
