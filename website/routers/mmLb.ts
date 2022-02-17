import { Router } from 'express';
import mmInterface from '../../modules/interface';
const router = Router();

router.get('/playtime', async (req, res) => {
    res.send(await mmInterface.getLeaderboard('playtime'));
})

router.get('/playtime/:stat', async (req, res) => {
    //@ts-expect-error
    res.send(await mmInterface.getLeaderboard('playtime', req.params.stat ?? 'total'));
})

router.get('/mobkills', async (req, res) => {
    res.send(await mmInterface.getLeaderboard('mobkills'));
})

router.get("/mobkills/:stat", async (req, res) => {
    //@ts-expect-error
    res.send(await mmInterface.getLeaderboard('mobkills', req.params.stat ?? 'total'));
})

router.get('/kills', async (req, res) => {
    res.send(await mmInterface.getLeaderboard('playerkills', 'total'));
})

router.get('/kills/:stat', async (req, res) => {
    //@ts-expect-error
    res.send(await mmInterface.getLeaderboard('playerkills', req.params.stat ?? 'total'));
})


export default router;