/** This doc was orginally video > element.js. I am editing and adding elements from audio > element.js. -CH */
/** PDF embed could work for anything like this but I am starting with Transcriptions to keep it clearly defined from the Quire PDF exports atm */

const { html } = require('~lib/common-tags')
const chalkFactory = require('~lib/chalk')
const path = require('path')

const logger = chalkFactory('Figure Video')
/**
 * Renders a native or embedded pdf viewer
 *
 * @param      {Object}  eleventyConfig  eleventy configuration
 *
 * @param      {Object}  figure          The figure object
 * @param      {String}  id              The id of the figure
 * @param      {String}  mediaType       The type of tag ('transcription')
 * @param      {String}  src             Source url for a static pdf file to be rendered as an object
 *
 * @return     {String}  An HTML <object> element
 */
module.exports = function (eleventyConfig) {
  const { imageDir } = eleventyConfig.globalData.config.figures
  const transcriptionElements = {
    transcription({ id, src }) {
      if (!src) {
        logger.error(`Cannot render Transcription (PDF) without 'src'. Check that figures data for id: ${id} has a valid 'src'`)
        return ''
      }

      return html`
        <object
          class="q-figure-transcription-element"
          data="${src}"
          type="application/pdf">
        </object>
      `
    }
  }

  return function ({
    id,
    mediaType,
    src
  }) {
    if (src) {
      src = src.startsWith('http') ? src : path.join(imageDir, src)
    }

    return transcriptionElements[mediaType]({ id, mediaType, src })
  }
}
