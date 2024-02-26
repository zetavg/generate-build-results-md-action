import { IOSBuildResult } from './schema'

export default function generateBuildResultsMd(
  buildResultsArray: unknown[]
): [string, string[]] {
  const errors: string[] = []
  const items: string[] = []

  buildResultsArray.forEach((buildResult: unknown, index: number) => {
    if (typeof buildResult !== 'object' || buildResult === null) {
      errors.push(
        `Invalid build result at index ${index}, expected Object, got ${buildResult}`
      )
      return
    }

    const buildResultObj = buildResult as Record<string, unknown>

    switch (buildResultObj.type) {
      case 'ios': {
        try {
          const iosBuildResult = IOSBuildResult.parse(buildResultObj)

          const versionAndBuildNumber = `${iosBuildResult.version} (${iosBuildResult.build_number})`

          if (
            iosBuildResult.archive_artifact_url &&
            iosBuildResult.testflight_upload_succeeded
          ) {
            items.push(
              `* **${iosBuildResult.name}**: \`${versionAndBuildNumber}\` has been uploaded to TestFlight. You can also download the Xcode archive [here](${iosBuildResult.archive_artifact_url}).`
            )
          } else if (iosBuildResult.testflight_upload_succeeded) {
            items.push(
              `* **${iosBuildResult.name}**: \`${versionAndBuildNumber}\` has been uploaded to TestFlight.`
            )
          } else if (iosBuildResult.archive_artifact_url) {
            items.push(
              `* **${iosBuildResult.name}**: Download the Xcode archive of \`${versionAndBuildNumber}\` [here](${iosBuildResult.archive_artifact_url}). This build has not been uploaded to TestFlight.`
            )
          }
        } catch (e) {
          errors.push(
            `Error processing iOS build result at index ${index}: ${e instanceof Error ? e.message : e}`
          )
          return
        }
        break
      }

      default: {
        errors.push(
          `Invalid build result type at index ${index}: ${buildResultObj.type}`
        )
        break
      }
    }
  })

  return [items.join('\n'), errors]
}
