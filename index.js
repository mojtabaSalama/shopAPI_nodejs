const app = require("./express/server");

const Port = process.env.PORT || 4000;
app.listen(Port, () => console.log(`server running on port ${Port}`));
