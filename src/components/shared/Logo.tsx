export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img
        src={import.meta.env.BASE_URL + "image copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy.png"}
        alt="Titan AI"
        className="h-8 w-auto"
      />
      <span className="text-lg font-bold tracking-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Titan AI</span>
      </span>
    </div>
  );
}
