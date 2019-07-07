const express = require('express');
const helmet = require('helmet');

const db = require('./data/db-config.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/species', async (req, res) => {
  // get all species from the database
  try {
    const species = await db('species'); 
    res.status(200).json(species);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/api/animals', async (req, res) => {
  // get all animals from the database
  try {
    // include species name
    const animals = await db('animals')
    .leftJoin('species', 'species.id', 'species_id'); 

    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create animal
server.post('/api/animals', async (req, res) => {
  try {
    const [id] = await db('animals').insert(req.body);

    const animal = await db('animals')
      .where({ id })
      .first();

    res.status(201).json(animal);
  } catch (error) {
    res.status(500).json(error);
  }
});

// remove species
server.delete('/api/species/:id', async (req, res) => {
  try {
    const count = await db('species')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = server;
