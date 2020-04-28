import {Router} from 'express';
import DrugStoreController from '../controllers/drugstore'

const drugstoreRouter = Router();

// render add drugstore ui
drugstoreRouter.get('/add-drugstore', (req, res)=>{
  res.render('addstore', {
    title: 'Add New Drugstore'
  });
});
// handle adding new drugstore
drugstoreRouter.post('/drugstore/add', async (req, res) => {
  const { name, phone_number, latitude, longitude } = req.body;
  if(!name || !phone_number || !latitude || !longitude) {
    return res.status(400).json({
      message: 'Please fill all fileds',
    });
  }
  try {
    const drugstoreadded = DrugStoreController.addNew({ name, phone_number, latitude, longitude });
    if(drugstoreadded){
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

export default drugstoreRouter;