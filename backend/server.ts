import app from "./src/app";
import envObj from "./src/config/config";

const port = envObj.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
