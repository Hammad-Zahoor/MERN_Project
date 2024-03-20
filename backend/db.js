const mongoose = require('mongoose');


const mongo_url = `mongodb+srv://zahoorhammad9212:vKWMmg8ML55QLwCw@cluster0.1biulvv.mongodb.net/Tutor?retryWrites=true&w=majority&appName=Cluster0`;

const mongoDB = async () => {
    try {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(mongo_url);
      console.log('Connected to MongoDB');
  
      const fetched_data = await mongoose.connection.db.collection("Tutor");
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
  

module.exports = mongoDB;
