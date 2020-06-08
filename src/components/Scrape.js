import React, { useState, useEffect } from "react";
import facade from "../api/apiFacade";

export default function Scrape() {
  const [scrapes, setScrapes] = useState([]);
  useEffect(() => {
    facade.fetchData("/api/scrape").then(json => {
      setScrapes(json);
    });
  }, []);
  return (
    <React.Fragment>
      <h1>Scrapes</h1>
      {scrapes.map(scrape => (
        <div key={scrape.url}>
          <p>URL: {scrape.url}</p>
          <p>Title: {scrape.title}</p>
          <p>DivCount: {scrape.divCount}</p>
          <p>BodyCount: {scrape.bodyCount}</p>
          <br />
        </div>
      ))}
    </React.Fragment>
  );
}
