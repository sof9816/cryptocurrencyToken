const GtToken = artifacts.require("GtToken");
var tokenInstance;

// accounts: return all account from Ganache
contract("GtToken", (accounts) => {
  it("initializes the contract with the correct values", async () => {
    tokenInstance = await GtToken.deployed();
    var tokenName = await tokenInstance.name();
    var tokenSymbol = await tokenInstance.symbol();
    var tokenStandard = await tokenInstance.standard();
    assert.equal(tokenName, "Gt Token", "This is correct name");
    assert.equal(tokenSymbol, "GT", "This is correct symbol");
    assert.equal(tokenStandard, "GT Token v1.0", "This is correct standard");
    return tokenInstance;
  });
  it("allocates the total supply upon deployment", async () => {
    tokenInstance = await GtToken.deployed();
    var totalSupply = await tokenInstance.totalSupply();
    var adminBalance = await tokenInstance.balanceOf(accounts[0]);
    //
    assert.equal(
      totalSupply.toNumber(),
      1000000,
      "sets total Supply to 1,000,000"
    );
    assert.equal(
      adminBalance.toNumber(),
      1000000,
      "it allocates the initial supply to the admin account"
    );
    return tokenInstance;
  });
  it("transfers token ownership", () => {
    return GtToken.deployed()
      .then((instance) => {
        tokenInstance = instance;
        return tokenInstance.transfer.call(accounts[1], 9999999999999999999);
      })
      .then(assert.fail)
      .catch((error) => {
        assert(error.message, "error message must cotain revert");
        return tokenInstance.transfer.call(accounts[1], 250000, {
          from: accounts[0],
        });
      })
      .then((success) => {
        assert.equal(success, true, "it returns true");
        return tokenInstance.transfer(accounts[1], 250000, {
          from: accounts[0],
        });
      })
      .then((receipt) => {
        assert.equal(receipt.logs.length, 1, "triggers one event");
        assert.equal(
          receipt.logs[0].event,
          "Transfer",
          'should be the "Transfer" event'
        );
        assert.equal(
          receipt.logs[0].args._from,
          accounts[0],
          "logs the account the tokens are transferred from"
        );
        assert.equal(
          receipt.logs[0].args._to,
          accounts[1],
          "logs the account the tokens are transferred to"
        );
        assert.equal(
          receipt.logs[0].args._value,
          250000,
          "logs the transfer amount"
        );
        return tokenInstance.balanceOf(accounts[1]);
      })
      .then((balance) => {
        assert.equal(
          balance.toNumber(),
          250000,
          "adds amount to receiving account"
        );
        return tokenInstance.balanceOf(accounts[0]);
      })
      .then((balance) => {
        assert.equal(
          balance.toNumber(),
          750000,
          "deducts amount from sending account"
        );
      });
  });
});
