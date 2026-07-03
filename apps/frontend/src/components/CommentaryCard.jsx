const commentary = [
  {
    over: "0.1",
    text: "FOUR! Beautiful cover drive.",
  },
  {
    over: "0.2",
    text: "Dot ball.",
  },
  {
    over: "0.3",
    text: "Single taken.",
  },
  {
    over: "0.4",
    text: "WICKET! Clean bowled.",
  },
];

export default function CommentaryCard() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        Ball by Ball Commentary

      </h2>

      <div className="space-y-4 max-h-96 overflow-y-auto">

        {commentary.map((item,index)=>(

          <div
            key={index}
            className="border-l-4 border-green-600 pl-4"
          >

            <p className="font-semibold">

              {item.over}

            </p>

            <p className="text-slate-600">

              {item.text}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}
