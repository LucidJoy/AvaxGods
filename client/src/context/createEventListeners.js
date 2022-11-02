import { ethers } from "ethers";

import { ABI } from "../../contract";

const AddNewEvent = (eventFilter, provider, callback) => {
  provider.removeListener(eventFilter); //not have multiple listeners at the same time

  provider.on(eventFilter, (logs) => {
    const parsedLogs = new ethers.utils.Interface(ABI).parseLog(logs);

    callback(parsedLogs);
  });
};

export const createEventListeners = ({
  navigate,
  contract,
  provider,
  walletAddress,
  setShowAlert,
  setUpdateGameData,
}) => {
  const NewPlayerEventFilter = contract.filters.NewPlayer();

  AddNewEvent(NewPlayerEventFilter, provider, ({ args }) => {
    console.log("New player created!", args);

    if (walletAddress === args.owner) {
      setShowAlert({
        status: true,
        type: "success",
        message: "Player has been registered!",
      });
    }
  });

  const NewBattleEventFilter = contract.filters.NewBattle();

  AddNewEvent(NewBattleEventFilter, provider, ({ args }) => {
    console.log("New battle started! ", args, walletAddress);

    if (
      walletAddress.toLowerCase() === args.player1.toLowerCase() ||
      walletAddress.toLowerCase() === args.player2.toLowerCase()
    ) {
      navigate(`/battle/${args.battleName}`);
    }

    setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
  });

  const BattleMoveEventFilter = contract.filters.BattleMove();

  AddNewEvent(BattleMoveEventFilter, provider, ({ args }) => {
    console.log(`Battle move initiated! -> ${args}`);
  });
};
