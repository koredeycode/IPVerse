import ContentCard from "./ContentCard";
import SearchBar from "./SearchBar";

const ExploreContent = () => {
  return (
    <div className="p-6">
      <SearchBar />
      <div className="grid grid-cols-3 gap-4">
        {[].map((item: any) => (
          <ContentCard key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default ExploreContent;
