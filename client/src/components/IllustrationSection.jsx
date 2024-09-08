import IllustrationImage from "../assets/register.jpg";

function IllustrationSection() {
  return (
    <div className="w-1/4 bg-[#FFFBF8]">
      <div className="font-semibold font-primary uppercase text-2xl pl-5 pt-3">
        <span className="text-slate-900">Organize</span>
        <span className="italic text-primary">me</span>
      </div>
      <div className="my-20">
        <img src={IllustrationImage} alt="register illustration" />
      </div>
    </div>
  );
}

export default IllustrationSection;
