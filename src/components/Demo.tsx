import { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle(newArticle);
    }
  };

  useEffect(() => {});

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            required
            className="w-full py-2 px-10 rounded-lg bg-gray-700"
          />

          <button
            type="submit"
            className="absolute right-0 rounded-md py-2 px-4 bg-gradient-to-br from-red-500 to-orange-500"
          >
            Submit
          </button>
        </form>

        {/* Browse URL history */}
      </div>

      {/* Results */}
    </section>
  );
};

export default Demo;
