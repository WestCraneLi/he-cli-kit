import fs from 'fs';

// TODO 异步转同步，也可以用readSyncFile
export const getJsonFileData = (filename, encoding = 'utf8') => {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(filename, encoding, (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        const INFO = JSON.parse(data);
        resolve(INFO);
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

// TODO 同步方法：writeSyncFile
export const setJsonFileData = (filename, data, encoding = 'utf8') => {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFile(filename, JSON.stringify(data, null, 2), encoding, err => {
        if (err) {
          console.error(err);
          reject(err);
        }
        // const INFO = JSON.parse(res);
        resolve(data);
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
