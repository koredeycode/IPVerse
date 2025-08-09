"use client";
import { useAuth } from "@campnetwork/origin/react";
import { useEffect } from "react";

import React from "react";

const Analytics = () => {
  const auth = useAuth();
  console.log("analytics");

  // const tokenId =
  //   62969147512708210739597738314450365440119337125482253728267133656897450032217n;

  // const tokenId =
  //   67388357632915690538465820018666087232104583430248641964197656314852973621452n;
  const tokenId =
    59077534212167312237096645339646153945227359782973434930030206361735319013045n;
  useEffect(() => {
    const testing = async () => {
      console.log("testing");
      console.log("GetTerms", await auth.origin?.getTerms(tokenId));
      console.log("tokenUri", await auth.origin?.tokenURI(tokenId));
      console.log("ownerOf", await auth.origin?.ownerOf(tokenId));
      console.log("dataStatus", await auth.origin?.dataStatus(tokenId));
      console.log(
        "hasAccess",
        await auth.origin?.hasAccess(
          "0x6453DBB7148d30a517E2E16AE5b11B3b7d2cEC29",
          tokenId
        )
      );
    };
    testing();
  }, []);

  async function click() {
    console.log("buy");
    await auth.origin?.buyAccessSmart(tokenId, 1);
  }

  return (
    <div>
      <button onClick={click}>Click Click</button>
    </div>
  );
};

export default Analytics;
