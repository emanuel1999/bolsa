const emailFunctions = require('../services/emails');

//emailFunctions.sendWelcomeEmail("franmassello7670@gmail.com");
//emailFunctions.sendDefaultEmail("franmassello7670@gmail.com", "Test", "Test");
const emailsController = {	
    sendWelcomeEmail: async (to, res) => {
        await emailFunctions.sendWelcomeEmail(to);
    },
    sendDefaultEmail: async (to, subject, text, res,) => {
        await emailFunctions.sendDefaultEmail(to, subject, text);
    }
}
module.exports = emailsController;