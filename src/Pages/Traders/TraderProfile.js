import React from "react";
import { useParams } from "react-router-dom";

const TraderProfile = () => {
  const { id } = useParams();
  return <div>TraderProfile {id}</div>;
};

export default TraderProfile;
