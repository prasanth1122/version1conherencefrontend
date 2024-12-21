import { useNavigate } from "react-router-dom";

export default function CollectionCard({ name, updated, id }) {
  const navigate = useNavigate();
  return (
    <div
      className="min-w-64 h-28 px-4 rounded-xl bg-highlight_background flex items-center justify-between hover:cursor-pointer hover:shadow-card_shadow"
      onClick={() => {
        navigate(`/collection/${id}`);
      }}
    >
      <p className="text-lg font-bold">{name}</p>
      <p className="text-base">{updated}</p>
    </div>
  );
}
