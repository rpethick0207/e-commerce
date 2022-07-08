const router = require('express').Router();
const { Shop, Graphics } = require('../models');

// GET all graphics for homepage
router.get('/', async (req, res) => {
  try {
    const dbShopData = await Shop.findAll({
      include: [
        {
          model: Graphics,
          attributes: ['filename', 'description'],
        },
      ],
    });

    const graphicsCard = dbShopData.map((shop) =>
      shop.get({ plain: true })
    );
    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('homepage', {
      graphicsCard,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Graphic card
router.get('/shop/:id', async (req, res) => {
  try {
    const dbShopData = await Shop.findByPk(req.params.id, {
      include: [
        {
          model: Graphics,
          attributes: [
            'id',
            'manufacturer',
            'model',
            'price',
            'filename',
            'description',
          ],
        },
      ],
    });

    const shop = dbShopData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'shop' template
    res.render('shop', { gallery, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Graphics card
router.get('/graphics/:id', async (req, res) => {
  try {
    const dbGraphicsData = await Graphics.findByPk(req.params.id);

    const graphics = dbGraphicsData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('graphics', { graphics, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;
