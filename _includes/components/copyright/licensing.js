//CUSTOMIZED - changed text to Spanish

const { oneLine } = require('~lib/common-tags')

module.exports = function(eleventyConfig) {
  return function (params) {
    const { publication } = eleventyConfig.globalData
    const { license } = publication

    let licenseText = ''

    const licenseAbbreviation = license.abbreviation || license.name
    const licenseName = license.url
      ? `<a rel="license" href="${license.url}" target="_blank">${license.name}</a>`
      : license.name

    if (license.scope == 'some-exceptions') {
      licenseText += `
        Excepto donde se indique lo contrario, este obra tiene licencia ${licenseName}.
      `
    } else if (license.scope === 'text-only') {
      licenseText += `
        El texto de esta obra tiene licencia ${licenseName}. Excepto donde se indique lo contrario, todas las ilustraciones están excluidas de la ${licenseAbbreviation} licencia.
      `
    } else {
      licenseText += `
        Este obra tiene licencia ${licenseName}.
      `
    }

    return oneLine`
      ${licenseText}
      <span class="is-print-only">
        Para ver una copia de esta licencia, visite ${license.url}.
      </span>
    `
  }
}
