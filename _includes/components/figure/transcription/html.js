const { html } = require('~lib/common-tags')
/**
 * Renders a native or embedded pdf viewer with a caption
 *
 * @param      {Object}  eleventyConfig  eleventy configuration
 * @param      {Object}  figure          The figure object
 *
 * @return     {String}  HTML containing an object and a caption
 */
module.exports = function(eleventyConfig) {
  const figureCaption = eleventyConfig.getFilter('figureCaption')
  const figureLabel = eleventyConfig.getFilter('figureLabel')
  const figureTranscriptionElement = eleventyConfig.getFilter('figureTranscriptionElement')

  return async function({ caption, credit, id, label, src }) {
    const transcription = await transcriptionElement({ src })

    const labelElement = figureLabel({ caption, id, label })
    const captionElement = figureCaption({ caption, content: labelElement, credit })
    const transcriptionElement = figureTranscriptionElement({ id, mediaType, src })

    return html`
    <a
      class="q-figure__modal-link"
      href="#${id}"
    >
      ${transcription}
    </a>
    ${captionElement}
  `
  }
}