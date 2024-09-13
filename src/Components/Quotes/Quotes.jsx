import getQuotes from "@/lib/getQuotes";
import { Sofadi_One } from "next/font/google";

const font = Sofadi_One({
  subsets: ["latin"],
  weight: ["400"],
});

const Quotes = async () => {
  const data = await getQuotes();
  console.log(data?.slip?.advice);
  return (
    <div className={font?.className}>
      <p className="text-wrap font ">&ldquo;{data?.slip?.advice}&rdquo;</p>
    </div>
  );
};

export default Quotes;
