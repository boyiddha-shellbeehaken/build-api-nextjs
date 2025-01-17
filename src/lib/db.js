const { USERNAME, PASSWORD } = process.env;
//const username= process.env.username;
export const connectionStr =
  "mongodb+srv://" +
  USERNAME +
  ":" +
  PASSWORD +
  "@cluster0.ol0tt.mongodb.net/productDB?retryWrites=true&w=majority&appName=Cluster0";
