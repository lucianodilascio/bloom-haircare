
// Recibimos 'count' y 'setCount' desde el componente padre (ItemDetail)
const ItemCount = ({ stock, count, setCount }) => {

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full sm:w-40">
      <div className="flex items-center justify-between border border-stone-200 rounded-xl p-1 bg-stone-50">
        
        <button 
          onClick={decrement}
          disabled={count <= 1}
          className="h-10 w-10 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors font-bold text-lg active:scale-95 duration-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          -
        </button>

        {/* Muestra la cantidad controlada por el padre */}
        <span className="font-semibold text-stone-800 text-base select-none">
          {count}
        </span>

        <button 
          onClick={increment}
          disabled={count >= stock}
          className="h-10 w-10 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors font-bold text-lg active:scale-95 duration-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          +
        </button>

      </div>
    </div>
  );
};

export default ItemCount;