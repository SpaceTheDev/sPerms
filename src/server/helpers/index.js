const { discordRoles } = require('../../config.json');
module.exports = {
  buildPerms: function (userRoles) {
    let perms = { category: {} };
    for (const categories in discordRoles) {
      for (const role in discordRoles[categories]) {
        for (const i in userRoles) {
          if (userRoles[i] == discordRoles[categories][role]) {
            if (!perms[categories]) {
              perms[categories] = {};
            }
            perms[categories][role] = true;
            perms.category[categories] = true;
          }
        }
      }
    }
    for (const categories in discordRoles) {
      if (!perms[categories]) {
        perms[categories] = {};
      }
      for (const role in discordRoles[categories]) {
        if (!perms[categories][role]) {
          if (!perms[categories]) {
            perms[categories] = {};
          }
          perms[categories][role] = false;
          if (!perms.category[categories]) {
            perms.category[categories] = false;
          }
        }
      }
    }
    return perms;
  },
  getIdentifiers: function (source) {
    let numOfIds = GetNumPlayerIdentifiers(source);
    if (numOfIds != 0) {
      let identifiers = {};
      for (let i = 0; i < numOfIds; i++) {
        let a = GetPlayerIdentifier(source, i);
        let b = a.toString().split(':');
        let name = b[0];
        identifiers[name] = b[1];
      }
      return identifiers;
    } else {
      return false;
    }
  },
};
