const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const run = async () => {

    const connection = await oracledb.getConnection( {
      user          : "APP_SOY_UTEISTA",
      password      : "vJKD!zYU!8RD",
      connectString : "172.16.7.197:1535/ORAPROUTS"
    });

return connection;
}

module.exports = {
	run
}
