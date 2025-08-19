interface TravelCardProps {
  title: string;
  desc: string;
}

export default function TravelCard({ title, desc }: TravelCardProps) {
  return (
    <div className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}