import { Router } from "express";


import { getAllTabs, patchTab, postTab, deleteTab, getTabById } from '../controllers/tabs.controls.js'

const router = Router();

router.get('/', getAllTabs);
router.get('/:id', getTabById);
router.patch('/:id', patchTab); // update
router.post('/', postTab);
router.delete('/:id', deleteTab);

export default router;
