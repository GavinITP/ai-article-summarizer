import { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

interface Article {
  url: string;
  summary: string;
}

const Demo = () => {
  const [article, setArticle] = useState<Article>({ url: "", summary: "" });
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [copied, setCopied] = useState("");
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle({ ...article, summary: data.summary });

      const updatedArticles = [newArticle, ...allArticles];
      setAllArticles(updatedArticles);

      localStorage.setItem("articles", JSON.stringify(updatedArticles));
    }
  };

  const handleCopy = (copyUrl: string) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(""), 3000);
  };

  useEffect(() => {
    const localArticles = JSON.parse(
      localStorage.getItem("articles") as string
    );

    if (localArticles) setAllArticles(localArticles);
  }, []);

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
            className="w-full py-2 px-10 rounded-lg bg-gray-700 text-sm md:text-base"
          />

          <button
            type="submit"
            className="text-sm md:text-base absolute right-0 rounded-md py-2 px-4 bg-gradient-to-br from-red-500 to-orange-500"
          >
            Submit
          </button>
        </form>

        {/* Browse URL history */}
        <div className="flex flex-col gap-2 max-h-[250px] overflow-y-scroll my-4 text-sm md:text-base">
          {allArticles.map((article, index) => (
            <div
              key={"link-" + index}
              onClick={() => {
                setArticle(article);
                handleCopy(article.url);
              }}
              className="flex items-center py-4 px-4 gap-2 cursor-pointer bg-gray-700 rounded-lg"
            >
              <img
                src={copied === article.url ? tick : copy}
                alt="copy icon"
                className="w-6 h-6 object-contain"
              />
              <p className="text-blue-300">{article.url}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-bold text-center text-red-500">
            Something went wrong, Please try again.
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3 text-center">
              <h2 className="font-satoshi font-bold text-3xl">
                Article{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500  to-violet-500">
                  Summary
                </span>
              </h2>

              <div>
                <p className="my-6 mx-4 text-gray-400">{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
