import "./db";
import "./models/post";
import app from "./server"

const PORT = 4591;

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);