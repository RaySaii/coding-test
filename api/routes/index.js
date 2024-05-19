const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();
const { Auth } = require('@blocklet/sdk');
const User = require('../../data/User');

const client = new Auth();

router.get('/user', middleware.user(), async (req, res) => {
  if (!req.user) {
    res.json({ user: null });
    return;
  }

  try {
    let dbUser = await User.findOne({ where: { did: req.user.did } });
    if (!dbUser) {
      const { user } = await client.getUser(req.user.did);
      await User.create(user);
      dbUser = await User.findOne({ where: { did: req.user.did } });
      res.json({ user: dbUser });
    } else {
      res.json({ user: dbUser });
    }
  } catch (e) {
    console.error(e);
    res.json({ user: null });
  }
});

router.post('/user', async (req, res) => {
  await User.update(req.body, { where: { did: req.body.did } });
  res.json({ success: true });
});

module.exports = router;
