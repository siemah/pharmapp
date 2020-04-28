import { Router } from 'express';
import DrugStoreController from '../controllers/drugstore'
import Drug from '../models/Drug';
import DrugStore from '../models/Drugstore';
import { FindOptions } from 'sequelize/types';

const drugstoreRouter = Router();

// render add drugstore ui
drugstoreRouter.get('/add-drugstore', (req, res) => {
  res.render('addstore', {
    title: 'Add New Drugstore'
  });
});

// handle adding new drugstore
drugstoreRouter.post('/drugstore/add', async (req, res) => {
  const { name, phone_number, latitude, longitude } = req.body;
  if (!name || !phone_number || !latitude || !longitude) {
    return res.status(400).json({
      message: 'Please fill all fileds',
    });
  }
  try {
    const drugstoreadded = DrugStoreController.addNew({ name, phone_number, latitude, longitude });
    if (drugstoreadded) {
      return res.status(200).json({
        status: 'SUCCESS',
        message: `You just add ${name} successfully`
      });
    }
    res.status(200).json({
      message: `Please try again`
    });
  } catch (error) {
    res.status(400).json({
      message: `Please try after a moment`
    });
  }
});

// render asign drugs to store
drugstoreRouter.get('/add-drug-to-store', async (req, res) => {
  // get all drugs and store
  let drugs: object[];
  let drugstores: object[];
  const _options = { 
    attributes: ['name', 'id'],
    order: [['name', 'ASC']],
    raw: true,
  };

  try {
    drugs = await Drug.findAll(_options as FindOptions);
    drugstores = await DrugStore.findAll(_options as FindOptions);
  } catch (error) {
    drugs = [];
    drugstores = [];
  }
  res.render('add-drug-to-store', {
    title: 'Add drugs to your drugstore',
    drugs,
    drugstores,
  });
});

// handle adding drug to store
drugstoreRouter.post('/drugstore/add-drug', async (req, res) => {
  const { drug, store } = req.body;
  if (!drug || !store) {
    return res.status(400).json({
      message: 'Please fill all fileds',
    });
  }
  try {
    const drugstoreadded = await DrugStoreController.addDrugToStore(drug, store);
    if (drugstoreadded) {
      return res.status(200).json({
        status: 'SUCCESS',
        message: `You just add new drug to your drugstore successfully`
      });
    }
    res.status(200).json({
      message: `Please try again`
    });
  } catch (error) {
    res.status(400).json({
      message: `Please try after a moment`
    });
  }
});

export default drugstoreRouter;