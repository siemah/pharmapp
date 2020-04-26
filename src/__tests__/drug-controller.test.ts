import DrugController from '../controllers/drug';

describe('DrugController', () => {
  const drugname = '';
  test('should return an empty array of void drugs', async () => {
    const drugsList = await DrugController.findDrugsBy(drugname);
    expect(drugsList).toEqual([]);
  })
  
})
