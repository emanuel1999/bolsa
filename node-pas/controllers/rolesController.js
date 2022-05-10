
const rolesController = {
    index: (req, res) => {
        try {
            return res.status(200).json({message: 'From roles controller'});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = rolesController;