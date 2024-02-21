const UUID = require("uuid");
const { format } = require("date-fns")
const fs = require("fs")
const fsPromises = require("fs").promises;
const path = require("path")

const LOGS_FOLDER = path.join(__dirname, "logs")
const EVENTS_LOG_FILE = path.join(LOGS_FOLDER, "eventLogs.txt")

const LogEvents = async (message) => {
    try {
        if(!fs.existsSync(LOGS_FOLDER)) {
            await fsPromises.mkdir(LOGS_FOLDER)
        }

        const event = {
            id: UUID.v4(),
            date: format(new Date(), "MM/dd/yyyy HH:mm:ss"),
            message
        }
        await fsPromises.appendFile(EVENTS_LOG_FILE, `${JSON.stringify(event)}\n`)
    } catch (error) {
        console.error(error)
    }
}

module.exports = LogEvents;