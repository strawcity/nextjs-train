"use client";
import { useEffect, useState } from "react";
import { Metro } from "../types/getTrains";
import { willYouMakeIt } from "../helpers/willYouMakeIt";
import classNames from "classnames";

type CountDownProps = {
  centralDirectedTrains: Metro[];
  walkingTime: number;
};

const CountDown = ({ centralDirectedTrains, walkingTime }: CountDownProps) => {
  const [toMakeThisTrain, setToMakeThisTrain] = useState<any>();
  const [leaveWindowHeight, setLeaveWindowHeight] = useState("");

  function difference2Parts(milliseconds: number): {
    minutes: number;
    seconds: number;
  } {
    const secs = Math.floor(Math.abs(milliseconds) / 1000);
    const mins = Math.floor(secs / 60);

    return {
      minutes: mins % 60,
      seconds: secs % 60,
    };
  }

  useEffect(() => {
    if (
      centralDirectedTrains.length > 0 &&
      willYouMakeIt(centralDirectedTrains[0].ExpectedDateTime, walkingTime)
    ) {
      const countDownTimer = setInterval(function () {
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + walkingTime);
        setToMakeThisTrain(
          difference2Parts(
            new Date(centralDirectedTrains[0].ExpectedDateTime).getTime() -
              currentTime.getTime()
          )
        );
      }, 1000);

      return function () {
        clearTimeout(countDownTimer);
      };
    }
  }, centralDirectedTrains);

  useEffect(() => {
    const closingWindow =
      toMakeThisTrain?.seconds + toMakeThisTrain?.minutes * 60;
    if (toMakeThisTrain?.minutes <= 3) {
      setLeaveWindowHeight(`${((closingWindow / 240) * 100).toFixed(0)}%`);
    } else {
      setLeaveWindowHeight("100%");
    }
  }, [toMakeThisTrain]);

  return (
    <>
      {centralDirectedTrains.length > 0 &&
        willYouMakeIt(centralDirectedTrains[0].ExpectedDateTime, walkingTime) &&
        toMakeThisTrain && (
          <div
            className={classNames(
              "w-1/2 relative flex text-white bg-zinc-800 flex-col justify-center align-middle items-center h-screen"
            )}
          >
            <div
              key={toMakeThisTrain.seconds}
              className={classNames(
                "absolute b w-full bottom-0 transition-all duration-75",
                {
                  // "bg-zinc-800": toMakeThisTrain.minutes > 3,
                  "bg-emerald-700":
                    toMakeThisTrain.minutes <= 3 &&
                    toMakeThisTrain.minutes >= 1,
                  "bg-orange-300": toMakeThisTrain.minutes === 0,
                }
              )}
              style={{ height: leaveWindowHeight }}
            />
            <h2 className="absolute z-10 text-8xl">
              {toMakeThisTrain.minutes}:
              {("0" + toMakeThisTrain.seconds).slice(-2)}
            </h2>
          </div>
        )}
    </>
  );
};

export default CountDown;
