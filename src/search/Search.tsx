import { ChangeEvent, useEffect, useState } from "react";

const Search = () => {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    setTimeout(() => {
      handleFetchData(event.target.value);
    }, 500);
  };

  const handleFetchData = async (value?: string) => {
    try {
      const url = value?.trim()
        ? `https://dummyjson.com/recipes/search?q=${encodeURIComponent(value)}`
        : "https://dummyjson.com/recipes?limit=100";

      const res = await fetch(url);
      const data = await res.json();
      setData(data?.recipes || []);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
      setData([]);
    }
  };

  const HighlightedText = (text: string, search: string) => {
    if (!search) return <span>{text}</span>;

    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i}>{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </span>
    );
  };

  useEffect(() => {
    handleFetchData();
  }, []);

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

      <div
        style={{
          marginTop: "8px",
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          backgroundColor: "#fff",
          overflow: "auto",
          maxHeight: "650px"
        }}
      >
        {data?.length > 0 ? (
          data.map((item: { name: string; id: number }) => (
            <div
              key={item.id}
              style={{
                padding: "11px 14px",
                fontSize: "14px",
                color: "#374151",
                borderBottom: "1px solid #f3f4f6",
              }}
            >
              {HighlightedText(item.name, userInput)}
            </div>
          ))
        ) : (
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
        )}
      </div>

      <style>
        {`
          input:focus {
            border-color: purple !important;
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
          }
        `}
      </style>
    </div>
  );
};

export default Search;
