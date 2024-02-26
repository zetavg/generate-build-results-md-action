import getBuildResultsArrayFromJson from './getBuildResultsArrayFromJson'

describe('getBuildResultsArrayFromJson', () => {
  it('should return an array of build results', () => {
    const buildResultsJson =
      '[{"name": "a", "status": "success"}, {"name": "b", "status": "failure"}]'
    const expectedBuildResults = [
      { name: 'a', status: 'success' },
      { name: 'b', status: 'failure' }
    ]

    const actualBuildResults = getBuildResultsArrayFromJson(buildResultsJson)

    expect(actualBuildResults).toEqual(expectedBuildResults)
  })

  it('should return an array if build results is an object', () => {
    const buildResultsJson =
      '{"a": {"name": "a", "status": "success"}, "b": {"name": "b", "status": "failure"}}'
    const expectedBuildResults = [
      { name: 'a', status: 'success' },
      { name: 'b', status: 'failure' }
    ]

    const actualBuildResults = getBuildResultsArrayFromJson(buildResultsJson)

    expect(actualBuildResults).toEqual(expectedBuildResults)
  })

  it('should throw an error if build results is not valid JSON', () => {
    expect(() => getBuildResultsArrayFromJson('abc')).toThrow()
  })

  it('should throw an error if build results is not an array or object', () => {
    expect(() => getBuildResultsArrayFromJson('123')).toThrow(
      'Invalid build results, expected Array or Object, got 123'
    )
    expect(() => getBuildResultsArrayFromJson('"abc"')).toThrow(
      'Invalid build results, expected Array or Object, got abc'
    )
  })
})
