import { useEffect, useRef, useState } from "react";

interface IRecipe {
  id: number;
  name: string;
}

const enum STATE {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

const SearchSuggest = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState<STATE>(STATE.LOADING);
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleFetchReceipes = async () => {
    try {
      setStatus(STATE.LOADING);
      const resp = await fetch(
        `${import.meta.env.VITE_BE_URL}/search?q=${userInput.trim()}`,
      );
      const data = await resp.json();
      setRecipes(data.recipes);
      setStatus(STATE.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(STATE.ERROR);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleFetchReceipes();
    }, 800);
    return () => clearTimeout(timerId);
  }, [userInput]);

  useEffect(() => {
    if (activeIndex >= 0) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [activeIndex]);
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
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              setActiveIndex((prev) =>
                prev === recipes.length - 1 ? 0 : prev + 1,
              );
            }
            if (event.key === "ArrowUp") {
              setActiveIndex((prev)=>prev<=0 ? -1 : prev-1)
            }
            if(event.key === 'Enter') {
              setUserInput(recipes[activeIndex]?.name)
              setActiveIndex(-1);
            }
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
      {status === STATE.SUCCESS && !recipes?.length ? (
        <div
          style={{
            padding: "14px",
            textAlign: "center",
            fontSize: "14px",
            color: "#9ca3af",
          }}
        >
          No results found
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
          recipes?.length > 0 &&
          recipes.map((item: IRecipe, index: number) => (
            <div
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              key={item.id}
              style={{
                padding: "11px 14px",
                fontSize: "14px",
                color: "#374151",
                borderBottom: "1px solid #f3f4f6",
                cursor: "pointer",
                backgroundColor: activeIndex === index ? "#f3f4f6" : "#fff",
              }}
              onClick={() => {
                setActiveIndex(-1)
                setUserInput(item.name)}}
            >
              {item.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchSuggest;
