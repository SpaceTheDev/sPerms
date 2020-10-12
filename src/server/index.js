const { needDiscord } = require('./src/config.json');
const { buildPerms, getIdentifiers } = require('./src/server/helpers');

let playerPerms = new Map();

function getPerms(source, cb) {
  const ids = getIdentifiers(source);
  if (ids.discord) {
    exports.sDiscord.getUserRoles({ user: ids.discord }, (completed, data) => {
      if (completed) {
        const perms = buildPerms(data);
        playerPerms.set(source, perms);
        cb(perms);
      } else {
        const perms = buildPerms();
        playerPerms.set(source, perms);
        cb(perms);
      }
    });
  } else {
    const perms = buildPerms();
    playerPerms.set(source, perms);
    cb(perms);
  }
}

onNet('sPerms:playerSpawned', () => {
  const src = source;
  getPerms(src, (perms) => {
    emitNet('sPerms:setPerms', src, perms);
  });
});

onNet('sDiscord:guildMemberUpdate', ({ id }) => {
  playerPerms.forEach((v, k) => {
    const identifiers = getIdentifiers(k);
    if (identifiers.discord == id) {
      getPerms(k, (perms) => {
        emitNet('sPerms:setPerms', k, perms);
      });
    }
  });
});

on('playerDropped', () => {
  delete playerPerms[source];
});

exports('getPlayerPerms', (id) => {
  return playerPerms.get(id);
});

on('playerConnecting', (name, kickReason, deferrals) => {
  let src = source;

  if (needDiscord) {
    deferrals.defer();
    deferrals.update('Checking to see if I can find a discord id for you!');
    const ids = getIdentifiers(src);
    if (ids) {
      if (ids.discord) {
        deferrals.done();
      } else {
        deferrals.done("Can't find a discord id. Make sure that you have discord linked");
      }
    } else {
      deferrals.done('Get get you identifiers, contact staff');
    }
  }
});
