import React from "react";
import { Link } from "react-router-dom";

class ChartList extends React.Component {
  constructor() {
    super();
    this.state = {
      coins: [
        { id: "ethereum", name: "ETHEREUM" },
        { id: "matic-network", name: "MATIC" },
        { id: "bitcoin", name: "BITCOIN" },
      ],
      input: "",
    };
  }

  onInputChangeHandler(e) {
    this.setState({
      input: e.target.value.toLowerCase(),
    });
  }

  render() {
    const filteredCoinList = this.state.coins
      .filter(
        (d) =>
          this.state.input === "" ||
          d.id.toLowerCase().includes(this.state.input) ||
          d.name.toLowerCase().includes(this.state.input)
      )
      .map((d, index) => (
        <li key={index}>
          <Link to={{ pathname: "/chart/" + d.id }}>
            <button
              type="button"
              className="w-80 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {d.name}
            </button>
          </Link>
        </li>
      ));

    return (
      <React.Fragment>
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-black-600  place-self-center flex justify-center">
          Coins
        </h1>
        <div className="search">
          <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
              <div className="input-group relative flex justify-center flex-wrap items-stretch w-full mb-4">
                <input
                  value={this.state.input}
                  type="search"
                  className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Search Coins"
                  onChange={this.onInputChangeHandler.bind(this)}
                />
              </div>
            </div>
          </div>

          <ul className=" flex flex-row justify-center">{filteredCoinList}</ul>
        </div>
      </React.Fragment>
    );
  }
}

export default ChartList;
