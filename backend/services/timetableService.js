// timetableService.js
const EmailService = require("./emailService");

class TimetableService {
  constructor() {
    this.emailService = new EmailService();
  }

  async updateTimetableEntry(entryId, newData) {
    // Logic to update timetable entry

    // Send an email notification
    const recipientEmail = "kavi.fernando2001@gmail.com";
    const subject = "Timetable Entry Updated";
    const text = "Dear User, Your timetable entry has been updated.";
    await this.emailService.sendEmail(recipientEmail, subject, text);
  }
}

module.exports = TimetableService;
