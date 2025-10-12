import { RiDeleteBin5Line } from "react-icons/ri";
import Input from "../ui/Input";

const LineItemRow = ({
  idx,
  row, // { category, item, price, quantity, categoryId }
  onChange, // (id, event) => void
  onCategoryBlur, // (id, event) => void
  onRemove, // (id) => void
  datalistId, // categories-datalist
  subtotal, // (row) => number
  canRemove, // boolean
}) => (
  <div className="grid grid-cols-1 md:grid-cols-[3fr_3fr_2fr_1fr_2fr_auto] gap-2 items-center">
    <div>
      <label
        htmlFor={`category-${idx}`}
        className="md:hidden text-xs text-gray-500 mb-1"
      >
        카테고리
      </label>
      <Input
        id={`category-${idx}`}
        name="category"
        type="text"
        value={row.category}
        onChange={onChange}
        onBlur={onCategoryBlur}
        variant="data"
        placeholder="카테고리"
        list={datalistId}
      />
    </div>

    <div>
      <label
        htmlFor={`item-${idx}`}
        className="md:hidden text-xs text-gray-500 mb-1"
      >
        내용
      </label>
      <Input
        id={`item-${idx}`}
        name="item"
        type="text"
        value={row.item}
        onChange={onChange}
        variant="data"
        placeholder="예: 한돈 안심 600g"
      />
    </div>

    <div>
      <label
        htmlFor={`price-${idx}`}
        className="md:hidden text-xs text-gray-500 mb-1"
      >
        가격
      </label>
      <Input
        id={`price-${idx}`}
        name="price"
        type="number"
        value={row.price}
        onChange={onChange}
        variant="data"
        inputMode="numeric"
        min="0"
        placeholder="예: 21000"
      />
    </div>

    <div>
      <label
        htmlFor={`quantity-${idx}`}
        className="md:hidden text-xs text-gray-500 mb-1"
      >
        수량
      </label>
      <Input
        id={`quantity-${idx}`}
        name="quantity"
        type="number"
        value={row.quantity}
        onChange={onChange}
        variant="data"
        inputMode="numeric"
        min="0"
        placeholder="1"
      />
    </div>

    <div className="text-right md:text-left font-medium tabular-nums px-2">
      {subtotal(row).toLocaleString()}
    </div>

    <div className="flex justify-end items-center">
      <button
        type="button"
        onClick={onRemove}
        title="추가행 삭제"
        aria-label="추가행 삭제"
        disabled={!canRemove}
        className={[
          "p-1 rounded transition",
          canRemove ? "hover:bg-red-50" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <RiDeleteBin5Line
          size={22}
          className={[
            "transition-transform",
            canRemove ? "text-gray-400 hover:text-red-600 hover:scale-110" : "",
          ].join(" ")}
        />
      </button>
    </div>
  </div>
);

export default LineItemRow;
