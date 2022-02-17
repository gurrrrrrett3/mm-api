import { Router } from 'express';
import mmInterface from '../../modules/interface';
const router = Router();

router.get('/', async (req, res) => {
    res.send({
        success: false,
        error: "Please specify a valid playername at /player/:playername"
    });
    })

    router.get("/:username", async (req, res) => {
        const data = mmInterface.getPlayer(req.params.username);
        res.send(data);
    });

    router.get("/:username/sessions", async (req, res) => {
        const data = mmInterface.getPlayer(req.params.username) ;
        res.send(data.sessions);
    });

    router.get("/:username/sessions/:session", async (req, res) => {
        const data = mmInterface.getPlayer(req.params.username) ;
        res.send(data.sessions[parseInt(req.params.session)]);
    });

    



export default router;