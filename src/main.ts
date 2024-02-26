import * as core from '@actions/core'
import getBuildResultsArrayFromJson from './getBuildResultsArrayFromJson'
import generateBuildResultsMd from './generateBuildResultsMd'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const buildResultsJson: string = core.getInput('build-results-json')
    const buildResultsArray = getBuildResultsArrayFromJson(buildResultsJson)

    const [buildResultsMd, errorMessages] =
      generateBuildResultsMd(buildResultsArray)

    // Print the build results markdown
    core.info(
      '----------------------------------------------------------------'
    )
    core.info(buildResultsMd)
    core.info(
      '----------------------------------------------------------------'
    )

    // Print error messages
    if (errorMessages.length > 0) {
      errorMessages.forEach(errorMessage => {
        core.error(errorMessage)
      })
    }

    // Set outputs for other workflow steps to use
    core.setOutput('build-results-md', buildResultsMd)
    core.setOutput('build-results-md-json', JSON.stringify(buildResultsMd))
    core.setOutput(
      'build-results-md-json-text',
      JSON.stringify(buildResultsMd).slice(1, -1)
    )
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
