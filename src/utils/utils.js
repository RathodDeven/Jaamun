import axios from "axios";
// import { Biconomy } from "@biconomy/mexa";
// import { ethers } from "ethers";
// import JaMoon from "./JaMoon.json";
export const pinJSONToIPFSAndReturnCid = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios
    .post(url, JSONBody, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
      },
    })
    .then(function (response) {
      console.log(response);
      // link
      // return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      return response.data.IpfsHash;
      // handle response here
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
      // handle error here
    });
};

// export const connectWallet = async (cid, address) => {
//   if (window.ethereum) {
//     try {
//       const biconomy = new Biconomy(window.ethereum, {
//         apiKey: "a25b3acc-2d71-4658-a189-0f5eb0fc8a15",
//         debug: true,
//       });
//       await window.ethereum.enable();
//       if (!(window.ethereum.networkVersion === "137")) {
//         alert("Please switch to matic mumbai");
//       }
//       const provider = new ethers.providers.Web3Provider(biconomy);
//       const signer = provider.getSigner();
//       const nonce = await JaMoon.contract.methods.getNonce(address).call();
//       console.log(nonce);
//       const contract = new ethers.Contract(
//         "0x2F5D8F645c7FD35e3Abd86231624fB9f6672C13E",
//         JaMoon,
//         signer
//       );
//       const ContractName = JaMoon.contractName;
//       const functionSignature = JaMoon.contract.methods.swap(cid).encodeABI();
//       console.log(functionSignature);
//       const res = await contract.swap(cid);
//       const receipt = await res.wait();

//       if (receipt.status === 1) {
//         console.log(
//           "Domain minted! https://rinkeby.etherscan.io/tx/" + res.hash
//         );
//         return res.hash;
//       } else {
//         alert("Transaction failed! Please try again");
//       }
//     } catch (error) {
//       console.log("Please allow access to connect to web3 ");
//     }
//   } else {
//     console.log(
//       "Non-Ethereum browser detected. You should consider trying MetaMask!"
//     );
//   }
// };
