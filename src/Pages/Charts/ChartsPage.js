import React, { useEffect, useState, useCallback } from "react";
import Plot from "react-plotly.js";
import { useLocation, useParams } from "react-router-dom";

const ChartsPage = () => {
  const location = useLocation();
  const [prices, setPrices] = useState([]);
  const { id } = useParams();
  const coinId = location.pathname.split("/").reverse()[0];

  const getPrice = useCallback(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`
    )
      .then((response) => response.json())
      .then((data) => {
        setPrices(data.prices);
      });
  }, [coinId, prices]);

  useEffect(() => {
    if (!prices.length) getPrice();
  }, [getPrice]);

  const trace = {
    x: prices.map((d) => d[0]),
    y: prices.map((d) => d[1]),
    line: { color: "rgba(31,119,180,1)" },
    type: "scatter",
    mode: "lines",
    xaxis: "x",
    yaxis: "y",
  };

  const data = [trace];

  const images = [];
  // images = [
  //     {
  //         source: 'https://images.plot.ly/language-icons/api-home/python-logo.png',
  //         xref: 'x',
  //         yref: 'y',
  //         x: '2017-01-23',
  //         y: 120,
  //         sizex: 24 * 60 * 60 * 1000,
  //         sizey: 1,
  //         xanchor: 'center',
  //         yanchor: 'bottom',
  //     },
  //     {
  //         source: 'https://images.plot.ly/language-icons/api-home/python-logo.png',
  //         xref: 'x',
  //         yref: 'y',
  //         x: '2017-01-27',
  //         y: 135.2,
  //         sizex: 24 * 60 * 60 * 1000,
  //         sizey: 1,
  //         xanchor: 'center',
  //         yanchor: 'bottom',
  //     },
  // ];

  const layout = {
    dragmode: "zoom",
    margin: {
      r: 10,
      t: 25,
      b: 40,
      l: 60,
    },
    showlegend: false,
    xaxis: {
      autorange: true,
      domain: [0, 1],
      // range: ['2017-01-03 12:00', '2017-02-15 12:00'],
      // rangeslider: { range: ['2017-01-03 12:00', '2017-02-15 12:00'] },
      title: "Date",
      type: "date",
    },
    yaxis: {
      autorange: true,
      domain: [0, 1],
      // range: [114.609999778, 137.410004222],
      type: "linear",
    },
    images,
  };

  return (
    <React.Fragment>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-medium leading-tight flex justify-center text-5xl mt-0 mb-2 text-black-600 place-content-center">
          Price Chart for {coinId.toUpperCase()}
        </h1>
        <Plot data={data} layout={layout} className="place-items-center" />
      </div>
    </React.Fragment>
  );
};

export default ChartsPage;
