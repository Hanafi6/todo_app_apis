import { Router } from 'express';
import {
    getAllProducts,
    getProductById,
    postProduct,
    deleteProduct,
    getProductsStats
} from '../controllers/Courses.controler.js';



import { validate } from '../middlewares/validate.js';
import { createCourseSchema } from '../scema/scema.js';


const router = Router();

router.get('/', getAllProducts);
router.get('/stats/overview', getProductsStats);
router.get('/:id', getProductById);
router.post('/', validate(createCourseSchema), postProduct);
router.delete('/:id', deleteProduct);

export default router;