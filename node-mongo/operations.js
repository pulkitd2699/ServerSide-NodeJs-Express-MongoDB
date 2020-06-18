const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
    const collec = db.collection(collection);
    // collec.insert(document, (err, result) => {
    //     assert.equal(err,null);
    //     console.log("Inserted : " + result.result.n + " documents into the collection " + collection);
    //     callback(result);
    // });
    return collec.insert(document);  //returning promises
};

exports.findDocuments = (db, collection, callback) => {
    const collec = db.collection(collection);
    // collec.find({}).toArray((err, docs) => {
    //     assert.equal(err,null);
    //     callback(docs);
    // });
    return collec.find({}).toArray();
};

exports.removeDocument = (db, document, collection, callback) => {
    const collec = db.collection(collection);
    // collec.deleteOne(document, (err,result) => {
    //     assert.equal(err,null);
    //     console.log("Removed the document ", document);
    //     callback(result);
    // }); 
    return collec.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const collec = db.collection(collection);
    // collec.updateOne(document, {$set: update}, null, (err, result) => {
    //     assert.equal(err,null);
    //     console.log("Updated the document with ", update);
    //     callback(result);
    // }); 
    return collec.updateOne(document, {$set: update}, null);
};