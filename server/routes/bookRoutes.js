import express from 'express';
import { allBook, bookDelete, bookDetail, updatePage } from '../controller/bookController.js';
const router=express.Router();

router.post("/addBook",bookDetail)
router.get("/bookList",allBook);
router.post("/delete",bookDelete);
router.post("/update",updatePage);
export default router;