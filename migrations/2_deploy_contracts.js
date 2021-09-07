const GtToken = artifacts.require("GtToken");

module.exports = function (deployer) {
  deployer.deploy(GtToken);
};
