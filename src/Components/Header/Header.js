import React from "react";
import { Link } from "react-router-dom";
import ConnectButton from "../ConnectButton/ConnectButton";

const Header = () => {
  const MenuItems = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Charts",
      url: "/charts",
    },
    {
      title: "Swap",
      url: "/swap",
    },
  ];
  return (
    <div>
      <div className="bg-black-600 py-4">
        <div className="container mx-auto">
          <div className="flex flex-row">
            {MenuItems.map((item) => {
              return (
                <Link key={item.url} to={item.url}>
                  <div className="px-4">
                    <p className="text-black capitalize">{item.title}</p>
                  </div>
                </Link>
              );
            })}
            <ConnectButton />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
