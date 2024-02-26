export default function getBuildResultsArrayFromJson(
  buildResultsJson: string
): unknown[] {
  const buildResults = JSON.parse(buildResultsJson)
  const buildResultsArray = Array.isArray(buildResults)
    ? buildResults
    : typeof buildResults === 'object'
      ? Object.values(buildResults)
      : (() => {
          throw new Error(
            `Invalid build results, expected Array or Object, got ${buildResults}`
          )
        })()
  return buildResultsArray
}
