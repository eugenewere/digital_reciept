// localStorage.setItem('db', 'exist');
// var storage_db= localStorage.getItem('db');
// if (! storage_db){

    var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS taxvalues ( name text, value integer)");
    });
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS discount ( name text, value integer)");
    });


// }