const router = require('express').Router();

const Tracks = require('./tracks-model.js');

router.get('/', async (req, res) => {
  try {
    const tracks = await Tracks.find();
    res.status(200).json(tracks);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'We ran into an error retrieving the tracks' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const track = await Tracks.findById(req.params.id);
    if (track) {
      res.status(200).json(track);
    } else {
      res.status(404).json({ message: 'We could not find the track' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'We ran into an error retrieving the track' });
  }
});

router.post('/', async (req, res) => {
  const track = req.body;

  if (track.name) {
    try {
      const inserted = await Tracks.add(track);
      res.status(201).json(inserted);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'We ran into an error creating the track' });
    }
  } else {
    res.status(400).json({ message: 'Please provide name of the track' });
  }
});

router.put('/:id', async (req, res) => {
  const changes = req.body;

  if (changes.name) {
    try {
      const updated = await Tracks.update(req.params.id, changes);
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          message: 'That track does not exist',
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'We ran into an error updating the track' });
    }
  } else {
    res.status(400).json({
      message: 'Please provide the name of the track',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Tracks.remove(req.params.id);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: 'That track does not exist, perhaps it was deleted already',
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'We ran into an error removing the track' });
  }
});

module.exports = router;
