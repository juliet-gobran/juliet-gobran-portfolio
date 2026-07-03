"use client";

import { useSyncExternalStore } from "react";

const TIMEZONE = "Australia/Sydney";
let currentSnapshot = "";

function formatWollongongTime(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const hour = get("hour");
  const minute = get("minute");
  const second = get("second");
  const dayPeriod = get("dayPeriod").toLowerCase();
  const weekday = get("weekday");
  const day = get("day");
  const month = get("month");
  const year = get("year");

  return `${hour}:${minute}:${second}${dayPeriod} ${weekday} ${day} ${month} ${year} | Wollongong, Australia`;
}

function subscribe(onStoreChange: () => void) {
  const updateSnapshot = () => {
    const nextSnapshot = formatWollongongTime(new Date());

    if (nextSnapshot !== currentSnapshot) {
      currentSnapshot = nextSnapshot;
      onStoreChange();
    }
  };

  updateSnapshot();
  const intervalId = window.setInterval(updateSnapshot, 1000);
  return () => window.clearInterval(intervalId);
}

function getSnapshot() {
  return currentSnapshot;
}

function getServerSnapshot() {
  return "";
}

export function WollongongClock() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className="font-jura text-xs text-text-primary md:text-footer-clock">
      {time || "\u00a0"}
    </span>
  );
}
