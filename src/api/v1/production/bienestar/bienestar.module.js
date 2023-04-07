// const bienestarVersion = () => {
//     return '/api/v1/production/bienestar';
// };

// module.exports = {
//     bienestarVersion
// }

const app = require('./index');

module.exports = {
  bienestar: app,
  bienestarVersion: () => '/api/v1/production/bienestar',
};