var pg = require('pg');
var config = {
  user: 'postgres',
  password: 'khoapham',
  host: 'localhost',
  port: 5432,
  database: 'EmployeeDB',
  max: 100,
  idleTimeoutMillis: 10000
}
var pool = new pg.Pool(config);

function query(sql, cb){
  var loi;
  var ketqua;

  pool.connect((err, client, done) => {
    if(err){
      loi = "Loi ket noi";
      cb(loi, ketqua);
      return console.log('Loi ket noi');

    }
    client.query(sql, (err, result) => {
      if(err){
        loi = "Loi truy van";
        cb(loi, ketqua);
        return console.log('Loi truy van');
      }
      ketqua = result
      cb(loi, ketqua);
    });
    done();
  });
}

function addClick(hinh, cb){
  var sql = `WITH a AS
            (UPDATE "Ad" SET click = click + 1
            WHERE hinh = '${hinh}' RETURNING *)
            SELECT * FROM a`;
  query(sql, cb);
}

module.exports = {query, addClick};
