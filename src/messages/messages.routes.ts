import { Router } from "express";

const router = Router();

router.get('/',(req, res)=>{
    res.json({
        msg:'hola cachito'
    })
})

export default router;