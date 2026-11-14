import express from 'express';
import cors from 'cors';
import path from 'path';
import userRoutes from './routes/userRoutes';
import vacationRoutes from './routes/vacationRoutes';
import likeRoutes from './routes/likeRoutes';
import aiRoutes from './routes/aiRoutes';
import mcpRoutes from './routes/mcpRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/users', userRoutes);
app.use('/api/vacations', vacationRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/mcp', mcpRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;