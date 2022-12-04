import React from "react";

const NewHomePage = () => {
  return (
    <div>
      <div className="w-full text-center text-6xl pt-10">
        🫐 JaMoon - Indexing Li.Fi. Swaps Through The Graph
      </div>
      <div className="w-full text-center text-2xl pt-10">
        View DeFi Token Swaps Details Across Chains as You wish 🚀{" "}
        <a
          href="https://thegraph.com/hosted-service/subgraph/rathoddeven/jamoonthegraph"
          target={"_blank"}
          rel="noreferrer"
        >
          <span className="text-blue-500">View Subgraph</span>
        </a>
      </div>
      <div className="flex flex-row w-full justify-around">
        <img src="/mainImage.jpg" className="w-[500px] m-[70px]" />
        <div className="flex flex-col m-[70px] text-4xl gap-5 font-bold align-right">
          <div>Interchain Swap using Li.Fi.</div>
          <div>Query Using The Graph</div>
          <div>Swap Details on IPFS</div>
          <div>Polygon Relayer Contract</div>
        </div>
      </div>
    </div>
  );
};

export default NewHomePage;
