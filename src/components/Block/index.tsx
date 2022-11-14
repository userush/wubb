import Image from "next/image";
import { _APP_NAME } from "shared/constants";
import { classNames } from "shared/utils";
import { v4 as uuid } from "uuid";

import Chart from "../../../public/assets/chart.svg";

interface IBlockProps<T> {
  title: string;
  content: T;
}

interface IBlockItemProps {
  item: string;
}

interface IPrizeBlockProps {
  title: string;
  text: string;
  contents: IBlockProps<string>[];
}

interface IPrizeBlockChartProps extends IBlockProps<string> {
  breakdown: IChartBreakdownProps[];
}

type IChartBreakdownProps = {
  text: string;
  percentage: number;
  className: string;
};

const Block = ({ title, content }: IBlockProps<string[]>) => {
  return (
    <div className="bg-shades-1 border-shades-3 border rounded-lg lg:p-1-5 p-1-45 shadow-lg">
      <article>
        <h1 className="text-1xl text-shades-10 mb-1 font-bold">{title}</h1>
        <ul>
          {content.map((item) => {
            return (
              <li key={uuid()} className="mb-1 last:mb-0 list-disc ml-1-25">
                <BlockItem item={item} />
              </li>
            );
          })}
        </ul>
      </article>
    </div>
  );
};

const BlockItem = ({ item }: IBlockItemProps) => {
  return <p className="text-shades-6">{item}</p>;
};

const PrizeBlock = ({ title, text, contents }: IPrizeBlockProps) => {
  return (
    <div className="bg-shades-1 border-shades-3 border rounded-lg lg:p-1-5 p-1-45 shadow-lg">
      <article className="px-0-25">
        <h1 className="text-1xl text-shades-10 mb-1 font-bold">{title}</h1>
        <p className="text-shades-6 mb-1">{text}</p>
        <ul>
          {contents.map((item) => {
            return (
              <li key={uuid()} className="mb-1 last:mb-0">
                <h2 className="text-xl text-shades-10 mb-1 font-semibold">
                  {item.title}
                </h2>
                <p className="text-shades-6">{item.content}</p>
              </li>
            );
          })}
        </ul>
      </article>
    </div>
  );
};

const PrizeBlockChart = ({
  title,
  content,
  breakdown,
}: IPrizeBlockChartProps) => {
  return (
    <div className="bg-shades-1 border-shades-3 border rounded-lg lg:p-1-5 p-1-45 shadow-lg h-full">
      <article className="px-0-25 flex flex-col h-full">
        <h1 className="text-1xl text-shades-10 mb-1 font-bold">{title}</h1>
        <p className="text-shades-6">{content}</p>
        <div className="flex items-center justify-between mt-auto w-full flex-col sm:flex-row">
          <div
            className={classNames(
              "relative flex items-center justify-center",
              "rounded-full bg-shades-2 border border-shades-3",
              "p-0-75 min-h-[199px] min-w-[199px] mt-1-5 sm:mt-0"
            )}
          >
            <Image src={Chart} alt={`${_APP_NAME} prize pool distribution`} />
          </div>
          <div className="h-full flex flex-col justify-between w-full sm:pl-1-5 mt-1-25">
            {breakdown.map(({ text, percentage, className }) => {
              return (
                <PrizeBlockChartItem
                  key={uuid()}
                  {...{ text, percentage, className }}
                />
              );
            })}
          </div>
        </div>
      </article>
    </div>
  );
};

const PrizeBlockChartItem = ({
  text,
  percentage,
  className,
}: IChartBreakdownProps) => {
  return (
    <div
      className={classNames(
        "px-[10px] py-[5px] bg-shades-0 border border-shades-2 mb-0-25",
        "flex items-center justify-between rounded-lg w-full"
      )}
    >
      <div className="flex items-center w-full">
        <div
          className={classNames(`h-[14px] w-[14px] rounded-full`, className)}
        />
        <span className="text text-sm  text-shades-8 ml-0-5">{text}</span>
      </div>
      <span className="font-bold text-shades-10">{percentage}%</span>
    </div>
  );
};

export default Block;
export { PrizeBlock, PrizeBlockChart };
