const db = require("../models");
const { validationResult } = require('express-validator' );

const contactsController = {
    store: async (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            const {body} = req;
            try {
                const contact = await db.Contacts.create(body);
                return res.status(200).json({
                    success: true,
                    data: contact
                });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        } else{
            return res.status(403).json({
                sucess: false,
                error: errors.mapped(),
            });
        }
    },
    getAll: async (req, res) => {
        try {
        const contacts = await db.Contacts.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"]
            }
        });
        return res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = contactsController;