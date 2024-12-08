import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/user.controller';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { updateProfileSchema } from '../schemas/user.schema';

const router = Router();

router.use(protect);

router.get('/profile', getProfile);
router.patch('/profile', validate(updateProfileSchema), updateProfile);

export default router;