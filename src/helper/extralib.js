//Overwrites defaultSettings values with overrideSettings and adds overrideSettings if non existent in defaultSettings
export function mergeOptions (defaultSettings, overrideSettings) {
  var newObject = {},
    i;
  for (i in defaultSettings) {
    newObject[i] = defaultSettings[i];
  }
  for (i in overrideSettings) {
    newObject[i] = overrideSettings[i];
  }
  return newObject;
}
