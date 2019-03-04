const fs = require('fs');

const fileUtils = {};

fileUtils.writeNewClient = function(fileName, dataToAdd) {
  console.log('data to add', dataToAdd);

  console.log('testCheckBox-1', dataToAdd['testCheckBox-1'] + '');
  console.log('testCheckBox-2', dataToAdd['testCheckBox-2'] + '');
  console.log('testCheckBox-3', dataToAdd['testCheckBox-3'] + '');

  // Create data to write object
  const newData = {
    phone: dataToAdd.phone ? new String(dataToAdd.phone) : ' ',
    name: dataToAdd.name ? new String(dataToAdd.name) : ' ',
    firstCB: dataToAdd['testCheckBox-1'] !== undefined ? 'true' : 'false',
    secondCB: dataToAdd['testCheckBox-2'] !== undefined ? 'true' : 'false',
    thirdCB: dataToAdd['testCheckBox-3'] !== undefined ? 'true' : 'false',
    date: new Date(),
  }
  fs.open(fileName, 'a+', function(err, fd) {
    if (err) {
      console.log(err);
    } else {
      // Add new line before client info
      let str = '\r\n';

      // For each data in clint object add specified line
      for (let data in newData) {
        str += data + ': ' + newData[data] + '\r\n';
      }

      // Write data to the file
      fs.write(fd, str, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('line', '"', str, '"', 'been written successful');
        }
      });

      // Close the file
      fs.close(fd, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('closing success');
        }
      });
    }
  });

  return newData;
}

module.exports = fileUtils;