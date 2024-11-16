

const checkPermissions = (permissions) => {
    return (req, res, next) => {
      try {
        const userPermissions = req.user.role; // Assumes `req.user` contains a `permissions` array
  
        // Check if any of the required permissions are in the user's permissions
        const hasPermission = permissions.some(permission => userPermissions.includes(permission));
  
        if (hasPermission) {
          return next(); // User has at least one required permission, proceed to the next middleware
        } else {
          return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
        }
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    };
  };
  
  module.exports = checkPermissions;
  