const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    
    console.log('Connected to SQlite in-memory database');

    var createTable = "CREATE TABLE IF NOT EXISTS memeTable (url VARCHAR(256));";
    db.run(createTable, function (e, result) {
     if (e) throw e;

     console.log("Meme table created");
    });
  });



module.exports = {
  deleteRating: function (ratee, stars, comment) {
    //TODO
  },
  
  getAllRatings: function() {
    //TODO
  },
  
  insertMeme: function (url) {
    db.run("INSERT INTO memeTable VALUES ( ? )", [url], 
    function (err, result) {
        if (err) throw err;

        console.log("1 record inserted");
    });    
  }
};
