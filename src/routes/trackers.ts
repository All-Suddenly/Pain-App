import { Router } from 'express';

export const TrackersRoutes = Router();

// Trackers
TrackersRoutes.get('/', async (req, res) => {
  return res.json(['Yes', 'No']);
});
