// SELECT ELEMENTS
const connectBtn = document.getElementById("connectBtn");
const switchBtn = document.getElementById("switchToSepolia");

const addressSpan = document.getElementById("address");
const networkSpan = document.getElementById("network");
const chainSpan = document.getElementById("chain");
const balanceSpan = document.getElementById("balance");
const blockSpan = document.getElementById("block");
const gasSpan = document.getElementById("gas");

// CONNECT META MASK
connectBtn.addEventListener("click", async () => {
  try {
    await ethereum.request({ method: "eth_requestAccounts" });
    loadData();
  } catch (err) {
    console.error(err);
  }
});

// LOAD BLOCKCHAIN DATA
async function loadData() {
  const provider = window.ethereum;

  // Address
  const accounts = await provider.request({ method: "eth_accounts" });
  const address = accounts[0];
  addressSpan.textContent = address;

  // Chain ID
  const chainId = await provider.request({ method: "eth_chainId" });
  chainSpan.textContent = chainId;

  // Network Name
  networkSpan.textContent = chainId === "0xaa36a7" ? "Sepolia" : "Unknown";

  // Balance
  const balance = await provider.request({
    method: "eth_getBalance",
    params: [address, "latest"]
  });
  balanceSpan.textContent = (parseInt(balance, 16) / 1e18).toFixed(4) + " ETH";

  // Latest Block
  const block = await provider.request({ method: "eth_blockNumber" });
  blockSpan.textContent = parseInt(block, 16);

  // Gas Price
  const gasPrice = await provider.request({ method: "eth_gasPrice" });
  gasSpan.textContent = (parseInt(gasPrice, 16) / 1e9).toFixed(4) + " Gwei";
}

// SWITCH TO SEPOLIA
switchBtn.addEventListener("click", async () => {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xaa36a7" }]
    });
    loadData();
  } catch (err) {
    console.error(err);
  }
});
