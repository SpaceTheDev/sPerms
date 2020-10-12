let firstSpawn = true;

on('playerSpawned', () => {
  if (firstSpawn) {
    emitNet('sPerms:playerSpawned');
  }
  firstSpawn = false;
});
