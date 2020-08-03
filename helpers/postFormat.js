function formatPost (name, time, location) {
    const formattedString = `\`\`\`Upcoming Boss: ${name} \n Time: ${time} GMT +8 \n Location: ${location}\`\`\``
    return formattedString
}

module.exports.formatPost = formatPost