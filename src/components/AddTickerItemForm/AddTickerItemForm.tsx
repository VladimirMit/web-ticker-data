import { useState } from "react";
import "../TickerItem/TickerItem.css";
import Props from "./Props";

function AddTickerItemForm({ createTicker }: Props) {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  return (
    <form
      className="ticker-item"
      onSubmit={(e) => {
        e.preventDefault();
        if (isCreating) return;
        setIsCreating(true);
        const formData = new FormData(e.currentTarget);
        createTicker(
          formData.get("code")?.toString() ?? "",
          formData.get("date_from")?.toString() ?? "",
          formData.get("date_to")?.toString() ?? ""
        ).then(() => setIsCreating(false));
      }}
    >
      <input name="code" type="text" required />
      <input name="date_from" type="date" required />
      <input name="date_to" type="date" required />
      {!isCreating && <input type="submit" />}
    </form>
  );
}

export default AddTickerItemForm;
