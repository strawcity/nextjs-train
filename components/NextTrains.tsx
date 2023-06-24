"use client";
import { Metro } from "../types/getTrains";
import { willYouMakeIt } from "../helpers/willYouMakeIt";
import classNames from "classnames";

type NextTrainsProps = {
  centralDirectedTrains: Metro[];
  walkingTime: number;
};

const NextTrains = ({
  centralDirectedTrains,
  walkingTime,
}: NextTrainsProps) => {
  function getDisplayMessage(expectedTime: string) {
    const makeIt = willYouMakeIt(expectedTime, walkingTime);
    const formattedDisplayTime = `${new Date(expectedTime).getHours()}:${(
      "0" + new Date(expectedTime).getMinutes()
    ).slice(-2)}`;

    switch (true) {
      case makeIt && expectedTime.includes("5 min"):
        return `You can make the ${formattedDisplayTime} train if you run!`;
      case makeIt:
        return `The next train is ${formattedDisplayTime}`;
      default:
        return `You're not gonna make the ${formattedDisplayTime} train`;
    }
  }

  return (
    <div className="flex-col gap-3 flex w-1/2 p-8">
      {centralDirectedTrains?.map((train, index) => (
        <div className="flex flex-col" key={train.ExpectedDateTime}>
          <div
            className={classNames("text-center p-6 font-thin  text-white", {
              " bg-emerald-700 text-4xl py-32 font-medium ":
                index === 0 &&
                willYouMakeIt(train.ExpectedDateTime, walkingTime),
              "bg-red-200": !willYouMakeIt(train.ExpectedDateTime, walkingTime),
              border: index !== 0,
            })}
          >
            {getDisplayMessage(train.ExpectedDateTime)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NextTrains;
