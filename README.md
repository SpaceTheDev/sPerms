# sPerms

This resource offers real time perms using discord roles. It takes a object of roles and return the same object, but true of false depending on if the they have the role. This doesn't work with most common discord perms resources, but it can with some work. You **NEED** [this](https://forum.cfx.re/t/release-sdiscord/1680021) resource in order for this resource to work!

---

## Installation

- Clone or download resource into your `resources` folder
- Config the config to your liking
- Add `sDiscord` to your server.cfg

## Exports

### getUserRoles (server)

The getUserRoles takes the server id of the player and returns the permission object.

#### Example Usage

LUA

```lua
print(exports['sPerms']:getPlayerPerms(soruce))
```

JS

```javascript
console.log(exports.sPerms.getPlayerPerms(source));
```

## Events

### sPerms:setPerms (client)

The event sPerms:setPerms will fire whenever a discord member roles changes, or when the player spawns in. It will return the permission object. This will only send the data to the client that had updated perms, not everyone. Note: It will only update when a roles are updated in the guild you have set in the `sDiscord` resource.

#### Example Usage

LUA

```lua
RegisterNetEvent('sPerms:setPerms')

AddEventHandler('sPerms:setPerms', function(perms)
  if perms.category.fivem then
    print('You have the FiveM role!')
  end
end)
```

JS

```javascript
onNet('sPerms:setPerms', (perms) => {
  console.log(perms);
});
```
