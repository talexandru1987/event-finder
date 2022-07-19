const { Search } = require("../../models");

const getSearchBySearchKey = async (req, res) => {
  const { searchKey } = req.params;

  const searchResultFromDb = await Search.findOne({
    where: {
      search_key: searchKey,
    },
  });

  const searchResult = searchResultFromDb.get({ plain: true });

  return res.json({
    success: true,
    data: {
      ...searchResult,
      search_results: JSON.parse(searchResult.search_results),
    },
  });
};

module.exports = {
  getSearchBySearchKey,
};
