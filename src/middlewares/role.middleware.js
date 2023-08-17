const profilesControllers = require('../profiles/profiles.controllers')
const rolesControllers = require('../roles/roles.controllers')

const roleMiddleware = async (req, res, next) => {
    const id = req.user.id
    const roleId = await profilesControllers.findRoleIdInProfileByUserId(id)
    const roleName = await rolesControllers.findRoleById(roleId)
    
    if(roleName.dataValues.name === 'admin'){
        next()
    } else {
        res.status(401).json({message: 'Permission Denied'})
    }
}


module.exports = roleMiddleware