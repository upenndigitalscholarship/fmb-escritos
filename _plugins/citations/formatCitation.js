//CUSTOMIZED - changed text to Spanish

const chalkFactory = require('~lib/chalk')
const Processor = require('simple-cite')

const logger = chalkFactory('plugins:citations')

const defaultStyles = {
  chicago: require('./styles/chicago-fullnote-bibliography'),
  mla: require('./styles/mla')
}

module.exports = function(options={}) {
  const locale = require(options.locale || 'locale-es-es')
  const styles = Object.assign(defaultStyles, options.styles)

  return function(item, params) {
    const { type } = params

    const style = styles[type]

    if (!style) {
      logger.error(`Citation style "${type}" is not supported. You may need to add it to _plugins/citations/styles.`)
      return
    }

    const processor = new Processor({
      items: [item],
      locale,
      style
    })
    processor.cite({ citationItems: [{ id: item.id }] })
    const citation = processor.bibliography().value
    return type === 'mla'
      ? `${citation.replace(/\s+$/, '')} Consultado <span class="cite-current-date">DD Mon. YYYY</span>.`
      : citation
  }
}
