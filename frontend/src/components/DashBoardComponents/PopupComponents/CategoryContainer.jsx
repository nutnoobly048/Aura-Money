import { useEffect, useState } from "react";
import { Search, CirclePlus } from "lucide-react";

function CategoryContainer({ isCategoryOpen, setData }) {
  const [categoryList, setCategoryList] = useState(["Food", "Home", "Salary", "Bill", "Transportation"]);
  const [visibleCat, setVisibleCat] = useState([])
  const [filter, setFilter] = useState();
  const [selectedCat, setSelectedCat] = useState(null);

  const filterFunc = (e) => {
    setVisibleCat(
      categoryList.map((item) => item.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ? "block" : "hidden")
    );
  };

  useEffect(() => {
    if (selectedCat == null) return;
    setData((prev) => ({...prev, category: selectedCat}));
  }, [selectedCat]);

  return (
    <div
      className={`z-10 absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center justify-center rounded-xl p-2 gap-y-2
      bg-white/80 border-2 border-zinc-300 drop-shadow-2xl
      ${isCategoryOpen ? "" : "hidden"}`}
    >
      <div className="flex items-center">
        <Search className="text-zinc-400" />
        <input
          name="filter"
          type="text"
          placeholder="Search Category or Create New"
          onChange={(e) => {
            filterFunc(e);
            setFilter(e.target.value);
          }}
          className="w-[250px] pl-1 focus:outline-none bg-zinc-100 rounded-lg"
        />
      </div>

      <div className={`w-full flex flex-col gap-y-1 max-h-40 overflow-y-auto`}>
        {categoryList.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedCat(item)}
            className={`w-full text-center rounded-lg py-1 px-2 shadow-md ${
              visibleCat[index]
            }
            ${
              !(selectedCat == item)
                ? "bg-white text-ui-green1"
                : "text-white bg-gradient-to-r from-[#62b79c] to-[#afd1a1]"
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      <CreateNewCat filter={filter}  categoryList={categoryList} setCategoryList={setCategoryList} />
    </div>
  );
}

export default CategoryContainer;

const CreateNewCat = ({ filter, categoryList, setCategoryList }) => {
  return (
    <button 
      onClick={() => setCategoryList([...categoryList, filter])}
      className='w-full flex justify-center items-center px-2 py-1 gap-x-2 bg-white rounded-lg shadow-xl border
      border-zinc-400'
    >
      <CirclePlus className="bg-ui-green1 text-white rounded-full"/>
      <p>Create <span>{filter ? filter + ' as a ' : ''}</span>new Category</p>  
    </button>
  );
};
