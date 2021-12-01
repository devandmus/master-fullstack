const sequelize = require('./sequelize.config');

// SELECT country_id, country from sakila.country;
const CountryModel = sequelize.define('country', {}, {
  tableName: 'country'
});

sequelize
  .sync()
  .then(async () => {
    const query = await CountryModel.findAll({
      attributes: ['country_id', 'country'],
    });

    query.forEach(entry => {
      console.log(entry.dataValues);
    })
  })
  .catch(err => console.log(err));

