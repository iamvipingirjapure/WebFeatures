import { ChangeEvent, useEffect, useRef, useState } from "react";
import { LRUCache } from "./utils/LRUCache.ts";

const enum STATE {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

interface IRecipe {
  id: number;
  name: string;
}

const SearchWithAbortController = () => {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState<IRecipe[]>([]);
  const [status, setStatus] = useState<STATE>(STATE.LOADING);

  //   const cache = useRef<Record<string, IRecipe[]>>({});
  const cache = useRef(new LRUCache<string, IRecipe[]>(5));
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  //   const handleFetchData = async (signal: AbortSignal) => {
  //     try {
  //       setStatus(STATE.LOADING);
  //       if (cache.current[userInput]) {
  //         setData(cache.current[userInput]);
  //         setStatus(STATE.SUCCESS);
  //         return;
  //       }

  //       const res = await fetch(
  //         `https://dummyjson.com/recipes/search?q=${encodeURIComponent(userInput)}`,
  //         { signal },
  //       );
  //       const data = await res.json();
  //       cache.current[userInput] = data?.recipes;
  //       setData(data?.recipes || []);
  //       setStatus(STATE.SUCCESS);
  //     } catch (e: unknown) {
  //       if (e instanceof Error && e.name === "AbortError") {
  //         console.log("Request was aborted");
  //         return;
  //       }
  //       setData([]);
  //       setStatus(STATE.ERROR);
  //     }
  //   };

  const handleFetchData = async (signal: AbortSignal) => {
    try {
      setStatus(STATE.LOADING);
      if (!userInput.trim()) {
        setData([]);
        setStatus(STATE.SUCCESS);
        return;
      }
      const cachedData = cache.current.get(userInput);

      if (cachedData) {
        setData(cachedData);
        setStatus(STATE.SUCCESS);
        return;
      }

      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${encodeURIComponent(userInput)}`,
        { signal },
      );

      const data = await res.json();

      const recipes = data?.recipes || [];

      cache.current.set(userInput, recipes);

      setData(recipes);
      setStatus(STATE.SUCCESS);
    } catch (e: unknown) {
      if (e instanceof Error && e.name === "AbortError") {
        console.log("Request was aborted");
        return;
      }

      setData([]);
      setStatus(STATE.ERROR);
    }
  };
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const id = setTimeout(() => {
      handleFetchData(signal);
    }, 500);
    return () => {
      abortController.abort();
      clearTimeout(id);
    };
  }, [userInput]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          placeholder="Search recipes..."
          style={{
            width: "100%",
            height: "42px",
            padding: "0 14px",
            boxSizing: "border-box",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            outline: "none",
            fontSize: "14px",
            color: "#111827",
            backgroundColor: "#fff",
          }}
        />
      </div>

      {status === STATE.ERROR ? (
        <div
          style={{
            padding: "14px",
            textAlign: "center",
            fontSize: "14px",
            color: "#9ca3af",
          }}
        >
          Error...
        </div>
      ) : null}
      {status === STATE.SUCCESS && !data?.length ? (
        <div
          style={{
            padding: "14px",
            textAlign: "center",
            fontSize: "14px",
            color: "#9ca3af",
          }}
        >
          No results
        </div>
      ) : null}
      <div
        style={{
          marginTop: "8px",
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          backgroundColor: "#fff",
          overflow: "auto",
          maxHeight: "650px",
        }}
      >
        {status === STATE.LOADING ? (
          <div
            style={{
              padding: "14px",
              textAlign: "center",
              fontSize: "14px",
              color: "#9ca3af",
            }}
          >
            Loading...
          </div>
        ) : (
          data?.length > 0 &&
          data.map((item: IRecipe) => (
            <div
              key={item.id}
              style={{
                padding: "11px 14px",
                fontSize: "14px",
                color: "#374151",
                borderBottom: "1px solid #f3f4f6",
              }}
            >
              {item.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchWithAbortController;
