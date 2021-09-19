const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', (req, res) => {
  // find all categories
   // be sure to include its associated Products
  Category.findAll({
    include: [
      {
      model: Product,
      attributes: ["id", "product_name", "price", "stock"]
  }
]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({message: " No category found with that id"});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
 
});

// get one category
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      attributes: ["id", "product_name", "price", "stock"]
    }]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({message: "No category found with that id"});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create new category
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name

  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// update categories
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
      where: {
        id: req.params.id
      }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({message: "No category found with that id"});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// delete categories
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({message: " No category with this id"});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
