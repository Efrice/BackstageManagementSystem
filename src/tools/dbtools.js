// 此工具的方法是对数据库的操作，含增删改查
// 1、导入模块
const MongoClient = require("mongodb").MongoClient;
// Connection URL
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "mongo-one";

/**
 * 连接到数据库的集合
 * 参数1：collectionName
 * 参数2：callback
 */
const collectionConnect = (collectionName, callback) => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    (err, client) => {
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      callback(client, collection);
    }
  );
};

/**
 * 查询所有数据
 * 参数1：collectionName
 * 参数2：{}
 * 参数3：callback
 */
const findList = (collectionName, params, callback) => {
  collectionConnect(collectionName, (client, collection) => {
    collection.find(params).toArray((err, docs) => {
      if (err) throw err;
      callback(docs);
      client.close();
    });
  });
};

/**
 * 查询一条数据
 * 参数1：collectionName
 * 参数2：params
 * 参数3：callback
 */
const findOne = (collectionName, params, callback) => {
  collectionConnect(collectionName, (client, collection) => {
    collection.findOne(params, (err, doc) => {
      if (err) throw err;
      client.close();
      callback(doc);
    });
  });
};

/**
 * 插入一条数据
 * 参数1：collectionName
 * 参数2：params
 * 参数3：callback
 */
const insertOne = (collectionName, params, callback) => {
  collectionConnect(collectionName, (client, collection) => {
    collection.insertOne(params, (err, result) => {
      if (err) throw err;
      client.close();
      callback(result);
    });
  });
};

/**
 * 更新一条数据
 * 参数1：collectionName
 * 参数2：condition条件，选中需要更新的那条数据
 * 参数3：params更新的数据参数
 * 参数4：callback
 */
const updateOne = (collectionName, condition, params, callback) => {
  collectionConnect(collectionName, (client, collection) => {
    collection.updateOne(condition,{$set:params}, (err, result) => {
      if (err) throw err;
      client.close();
      callback(result);
    });
  });
};

/**
 * 删除一条数据
 * 参数1：collectionName
 * 参数2：condition条件，选中需要删除的那条数据
 * 参数3：callback
 */
const deleteOne = (collectionName, condition, callback) => {
  collectionConnect(collectionName, (client, collection) => {
    collection.deleteOne(condition, (err, result) => {
      if (err) throw err;
      client.close();
      callback(result);
    });
  });
};

module.exports = {
  findList,
  findOne,
  insertOne,
  updateOne,
  deleteOne
};
