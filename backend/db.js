const mongoose = require('mongoose');


const mongo_url = 

const mongoDB = async () => {
    try {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(mongo_url);
      console.log('Connected to MongoDB');
  
      const fetched_data = await mongoose.connection.db.collection("users");
      console.log('Fetching data from collection...');
      const data = await fetched_data.find({}).toArray();
      //console.log('Data retrieved:', data);
      global.profile = data;
  
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  };
  
  module.exports = mongoDB;
  
