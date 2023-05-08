type props = {};

const trendingHashtags = [
  "#cryptocurrency",
  "#climatechange",
  "#AI",
  "#mentalhealth",
  "#blockchain",
  "#gamingnews",
  "#fitnessgoals",
  "#traveldestinations",
];

const TrendingPanel = (props: props) => {
  return (
    <div className="w-1/4 bg-gray-800 rounded-xl border border-gray-700 p-4 flex flex-col gap-2 py-6">
      {trendingHashtags.map((hashtag) => (
        <div
          className="py-1 hover:bg-slate-600 bg-opacity-50 rounded-xl pl-2 duration-150 cursor-pointer"
          key={hashtag}
        >
          {hashtag}
        </div>
      ))}
    </div>
  );
};

export default TrendingPanel;
