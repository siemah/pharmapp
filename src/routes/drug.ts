import { Router } from 'express';
import DrugController from '../controllers/drug';

const drugRouter = Router();

// searching for medicament
drugRouter.get('/drugs', async (req, res, next) => {
  let drugs = [];
  let { q = '' } = req.query;
  q = q?.toString().trim();

  if (!q || !q.length) {
    return res.redirect('/');
  }
  try {
    drugs = await DrugController.findDrugsBy(q);
  } catch (error) {
    drugs = [];
  }

  res.render('drugs', {
    title: `${q} - Drugmapp`,
    drugs,
    q,
  });
});
// render a add-drug page
drugRouter.get('/add-drug', (req, res)=>{
  res.render('adddrug', {
    title: 'Add New Drug'
  });
});
// handle adding new drug
drugRouter.post('/drug/add', async (req, res) => {
  const { name, description } = req.body;
  if(!name || !description) {
    return res.status(400).json({
      message: 'Please fill all fileds',
    });
  }
  try {
    const drugstoreadded = DrugController.addNew(name, description);
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

export default drugRouter;