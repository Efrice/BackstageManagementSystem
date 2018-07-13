const xtpl = require("xtpl");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "mongo-one";

const getListPage = (req, res) => {
  //   res.send("我来拿数据啦");
  //   console.log("我来拿数据啦");
  const keyword = req.query.keyword || ''
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      const db = client.db(dbName);
      const collection = db.collection("studentInfo");
      collection.find({name:{$regex:keyword}}).toArray((err, docs) => {
        // console.log(docs);
        client.close();
        xtpl.renderFile(
          path.join(__dirname, "../views/list.html"),
          { studentsList: docs,keyword },
          (err, content) => {
            if (err) throw err;
            // console.log("list ok");
            res.send(content);
          }
        );
      });
    }
  );
};

module.exports = {
  getListPage
};
