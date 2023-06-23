// TODO get package info

import { getJsonFileData } from '../utils/JsonFileData.js';

const { name, version, description } = await getJsonFileData('package.json');

export default {
  name,
  version,
  description,
};
