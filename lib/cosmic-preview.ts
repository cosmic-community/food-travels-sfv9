import { cookies } from 'next/headers'
import { createBucketClient } from '@cosmicjs/sdk'
import { cosmic } from '@/lib/cosmic'

interface GetCosmicResult {
  cosmic: ReturnType<typeof createBucketClient>
  previewToken: string | undefined
}

export async function getCosmic(): Promise<GetCosmicResult> {
  const cookieStore = await cookies()
  const previewToken = cookieStore.get('cosmic_preview')?.value

  if (!previewToken) {
    return { cosmic, previewToken: undefined }
  }

  // previewToken is passed through to the SDK at runtime, but it is not
  // declared on BucketConfig in every SDK version, so build the config
  // separately and cast it to keep the type check happy.
  const previewConfig = {
    bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
    readKey: process.env.COSMIC_READ_KEY as string,
    writeKey: process.env.COSMIC_WRITE_KEY as string,
    previewToken,
  } as Parameters<typeof createBucketClient>[0]

  const previewCosmic = createBucketClient(previewConfig)

  return { cosmic: previewCosmic, previewToken }
}