import React from "react";

import { PageHOC } from "../components";

const CreateBattle = () => {
  return (
    <div>
      {/* <h1 className='text-5xl p-3'>Avax Gods</h1>
      <h2 className='text-3xl p-3'>Web3 NFT Battle-style Card Game</h2>
      <p className='text-xl p-3'>Made with 💜 by JavaScript Mastery</p> */}
    </div>
  );
};

export default PageHOC(
  CreateBattle,
  <>
    Create <br />a new Battle
  </>,
  <>Create your own battle and wait for other players to join you</>
);
