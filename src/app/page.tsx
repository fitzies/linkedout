import Feed from "@/components/Feed";
import TrendingPanel from "@/components/TrendingPanel";
import UserPanel from "@/components/UserPanel";

const Page = () => {
  return (
    <div className="w-screen flex justify-center items-start p-4 gap-4">
      {/* @ts-ignore */}
      <UserPanel />
      {/* @ts-ignore */}
      <Feed />
      <TrendingPanel />
    </div>
  );
};

export default Page;
