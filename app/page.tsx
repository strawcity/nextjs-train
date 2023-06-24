"use client";
import CountDown from "@/components/CountDown";
import NextTrains from "@/components/NextTrains";
import { willYouMakeIt } from "@/helpers/willYouMakeIt";
import { Metro, SLResponse } from "@/types/getTrains";
import { useEffect, useState } from "react";

export default function Page() {
  const [walkingTime, setWalkingTime] = useState(6);
  const [data, setData] = useState<SLResponse | null>(null);
  const [centralDirectedTrains, setCentralDirectedTrains] = useState<Metro[]>(
    []
  );

  useEffect(() => {
    if (!data) {
      fetch("/api/getTrains")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setData(data);
        });
    }
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const interval = setInterval(function () {
      if (hour > 7 && hour < 23) {
        fetch("/api/getTrains")
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setData(data);
          });
      }
    }, 45000);

    return function () {
      clearTimeout(interval);
    };
  }, []);

  useEffect(() => {
    if (data)
      setCentralDirectedTrains(
        data.Metros.filter((metro) => {
          return (
            metro.LineNumber === "14" &&
            metro.JourneyDirection === 1 &&
            !metro.DisplayTime.includes("Nu") &&
            willYouMakeIt(metro.ExpectedDateTime, walkingTime)
          );
        })
      );
  }, [data]);

  return (
    <div className="App bg-zinc-900 font-alata w-screen h-screen justify-center items-center flex align-middle">
      <CountDown
        centralDirectedTrains={centralDirectedTrains || []}
        walkingTime={walkingTime}
      />
      <NextTrains
        centralDirectedTrains={centralDirectedTrains || []}
        walkingTime={walkingTime}
      />
    </div>
  );
}
