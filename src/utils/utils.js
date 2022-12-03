import axios from "axios";
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
