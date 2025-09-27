const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
    PORT: process.env.PORT || 3001,
    JWT_KEY: process.env.JWT_KEY
};
