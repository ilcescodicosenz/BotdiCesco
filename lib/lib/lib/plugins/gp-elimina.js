let handler = async (m, { conn, usedPrefix, command }) => {
    // Check if the message is a reply to another message
    if (!m.quoted) return

    try {
        let key = {}

        try {
            // Extract message key details from the quoted message
            key.remoteJid = m.quoted ? m.quoted.fakeObj.key.remoteJid : m.key.remoteJid
            key.fromMe = m.quoted ? m.quoted.fakeObj.key.fromMe : m.key.fromMe
            key.id = m.quoted ? m.quoted.fakeObj.key.id : m.key.id
            key.participant = m.quoted ? m.quoted.fakeObj.key.participant : m.key.participant
        } catch (e) {
            console.error(e)
        }

        // Send a delete message for the quoted message
        return conn.sendMessage(m.chat, { delete: key })

    } catch {
        // Fallback in case of an error
        return conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
    }
}

// Help command for the bot
handler.help = ['delete']

// Tagging the command for organization
handler.tags = ['group']

// Defining the command regex
handler.command = /^del(ete)?$/i

// Restricting the command to be used only in private chats
handler.group = false

// Admins can use this command
handler.admin = true

// The bot must also be an admin to execute this command
handler.botAdmin = true

// New features can be added here, such as logging deleted messages or notifying users

export default handler