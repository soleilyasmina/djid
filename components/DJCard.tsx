import React, { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";
import styles from "./DJCard.module.css";
import { read } from "fs";

const DJCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [info, _setInfo] = useState<any>({
    avatar: null,
    name: "",
    pronouns: "",
    genre: "",
    bpm: null,
    longestSet: null,
    bookings: null,
    totalBookings: null,
    collection: null,
    textColor: "#ffffff",
    textBorder: false,
  });

  const setInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    _setInfo((curr: any) => ({ ...curr, [name]: value }));
  };

  const updateAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files?.[0]);
      reader.onload = () => {
        _setInfo((curr: any) => ({ ...curr, avatar: reader.result }));
      }
    }
  };

  const changeBorder = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    switch (name) {
      case "white":
        _setInfo((curr: any) => ({
          ...curr,
          textBorder: "rgba(255, 255, 255, 0.4)",
        }));
        break;
      case "black":
        _setInfo((curr: any) => ({
          ...curr,
          textBorder: "rgba(0, 0, 0, 0.4)",
        }));
        break;
      default:
        _setInfo((curr: any) => ({ ...curr, textBorder: "transparent" }));
    }
  };

  const borderOptions = ["none", "white", "black"];

  const backgroundStyle = {
    backgroundImage: `repeating-linear-gradient(
      135deg,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.1) 1px,
      rgba(0, 0, 0, 0.1) 1px,
      rgba(0, 0, 0, 0) 2px
    ), url(${(info.avatar)})`
  }

  const print = useCallback(() => {
    if (ref.current !== null) {
      toPng(ref.current, { cacheBust: true })
        .then((dataURL) =>{
          const link = document.createElement("a");
          link.href = dataURL;
          link.download = "dj-trading-card.png";
          link.click();
        })
        .catch((error) => {
          console.error("oops, something went wrong!", error);
        });
    }
  }, [ref]);

  return (
    <div className={styles.grid}>
      <form className={styles.form}>
        <label>
          avatar:
          <input
            name="avatar"
            type="file"
            placeholder="Avatar"
            onChange={updateAvatar}
          />
        </label>
        <label>
          text color:
          <input
            name="textColor"
            type="color"
            onChange={setInfo}
            value={info.textColor}
          />
        </label>
        <label>
          text border:
          <span className={styles.textBorderTypes}>
            {borderOptions.map((color) => (
              <button
                key={color}
                name={color}
                onClick={changeBorder}
                type="button"
              >
                {color}
              </button>
            ))}
            <input
              name="textBorder"
              type="color"
              onChange={setInfo}
              value={info.textBorder}
            />
          </span>
        </label>
        <label>
          name:
          <input
            name="name"
            type="text"
            placeholder="your name"
            onChange={setInfo}
            value={info.name}
          />
        </label>
        <label>
          pronouns:
          <input
            name="pronouns"
            type="text"
            placeholder="he/him/she/her/they/them"
            onChange={setInfo}
            value={info.pronouns}
          />
        </label>
        <label>
          genre:
          <input
            name="genre"
            type="text"
            placeholder="house, dnb, jungle"
            onChange={setInfo}
            value={info.genre}
          />
        </label>
        <label>
          average bpm:
          <input
            name="bpm"
            type="number"
            placeholder="120"
            onChange={setInfo}
            value={info.bpm}
          />
        </label>
        <label>
          longest dj set:
          <input
            name="longestSet"
            type="text"
            placeholder="2 hours"
            onChange={setInfo}
            value={info.longestSet}
          />
        </label>
        <label>
          total dj bookings in 2022:
          <input
            name="bookings"
            type="number"
            placeholder="10"
            value={info.bookings}
            onChange={setInfo}
          />
        </label>
        <label>
          total dj bookings:
          <input
            name="totalBookings"
            type="number"
            placeholder="95"
            value={info.totalBookings}
            onChange={setInfo}
          />
        </label>
        <label>
          size of collection:
          <input
            name="collection"
            type="number"
            placeholder="300"
            onChange={setInfo}
            value={info.collection}
          />
        </label>
        <label>
          <button type="button" onClick={print}>create!</button>
        </label>
      </form>
      <div className={styles.preview} ref={ref}>
        <div className={styles.cardOverlay}></div>
        <div className={styles.previewImageContainer}>
          {info.avatar ? (
            <div style={backgroundStyle} />
          ) : (
            <div className={styles.blankPreview}></div>
          )}
          <p
            style={{
              color: info.textColor,
              background: info.textBorder || "transparent",
            }}
          >
            {info.name || "Your Name"}
          </p>
        </div>
        <div className={styles.previewDetail}>
          <span>Pronouns:</span>
          <span>{info.pronouns}</span>
        </div>
        <div className={styles.previewDetail}>
          <span>Genre:</span>
          <span>{info.genre}</span>
        </div>
        <div className={styles.previewDetail}>
          <span>Average BPM:</span>
          <span>{info.bpm}</span>
        </div>
        <div className={styles.previewDetail}>
          <span>Longest DJ Set:</span>
          <span>{info.longestSet}</span>
        </div>
        <div className={styles.previewDetail}>
          <span>Total DJ bookings in 2022:</span>
          <span>{info.bookings}</span>
        </div>
        <div className={styles.previewDetail}>
          <span>Total DJ bookings:</span>
          <span>{info.totalBookings}</span>
        </div>
        <div className={styles.previewDetail}>
          <span>Size of record collection:</span>
          <span>{info.collection}</span>
        </div>
      </div>
    </div>
  );
};

export default DJCard;
