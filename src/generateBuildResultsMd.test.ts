import generateBuildResultsMd from './generateBuildResultsMd'

describe('generateBuildResultsMd', () => {
  describe('error messages', () => {
    test('invalid schema', () => {
      const [, errorMessages] = generateBuildResultsMd([
        123,
        null,
        {},
        { type: 'ios' }
      ])

      expect(errorMessages[0]).toEqual(
        'Invalid build result at index 0, expected Object, got 123'
      )

      expect(errorMessages[1]).toEqual(
        'Invalid build result at index 1, expected Object, got null'
      )

      expect(errorMessages[2]).toEqual(
        'Invalid build result type at index 2: undefined'
      )

      expect(errorMessages[3]).toContain(
        'Error processing iOS build result at index 3'
      )
    })
  })

  describe('iOS build results', () => {
    test('do not have archive_artifact_url and not testflight_upload_succeeded', () => {
      const [buildResultsMd, errorMessages] = generateBuildResultsMd([
        {
          type: 'ios',
          name: 'iOS Sample',
          version: '1.2.3',
          build_number: 456,
          archive_artifact_url: '',
          testflight_upload_succeeded: false
        }
      ])

      expect(errorMessages).toEqual([])
      expect(buildResultsMd).toBe('')
    })

    test('has archive_artifact_url and testflight_upload_succeeded', () => {
      const [buildResultsMd, errorMessages] = generateBuildResultsMd([
        {
          type: 'ios',
          name: 'iOS Sample',
          version: '1.2.3',
          build_number: 456,
          archive_artifact_url: 'https://example.com',
          testflight_upload_succeeded: true
        }
      ])

      expect(errorMessages).toEqual([])
      expect(buildResultsMd).toMatchSnapshot()
    })

    test('has archive_artifact_url but not testflight_upload_succeeded', () => {
      const [buildResultsMd, errorMessages] = generateBuildResultsMd([
        {
          type: 'ios',
          name: 'iOS Sample',
          version: '1.2.3',
          build_number: 456,
          archive_artifact_url: 'https://example.com',
          testflight_upload_succeeded: false
        }
      ])

      expect(errorMessages).toEqual([])
      expect(buildResultsMd).toMatchSnapshot()
    })

    test('testflight_upload_succeeded but does not have archive_artifact_url', () => {
      const [buildResultsMd, errorMessages] = generateBuildResultsMd([
        {
          type: 'ios',
          name: 'iOS Sample',
          version: '1.2.3',
          build_number: 456,
          archive_artifact_url: 'https://example.com',
          testflight_upload_succeeded: false
        }
      ])

      expect(errorMessages).toEqual([])
      expect(buildResultsMd).toMatchSnapshot()
    })
  })

  describe('examples', () => {
    test('example 1', () => {
      const [buildResultsMd, errorMessages] = generateBuildResultsMd([
        {},
        {
          type: 'ios',
          name: 'iOS Sample - Archive',
          version: '1.2.3',
          build_number: 456,
          archive_artifact_url: 'https://example.com',
          testflight_upload_succeeded: false
        },
        { type: 'ios' },
        {
          type: 'ios',
          name: 'iOS Sample - TestFlight',
          version: '1.2.3',
          build_number: 456,
          archive_artifact_url: '',
          testflight_upload_succeeded: true
        },
        {
          type: 'ios',
          name: 'iOS Sample - Nothing',
          version: '1.2.3',
          build_number: 456,
          archive_artifact_url: '',
          testflight_upload_succeeded: false
        }
      ])

      expect(errorMessages).toMatchSnapshot()
      expect(buildResultsMd).toMatchSnapshot()
    })
  })
})
