import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div className="loading h-full flex justify-center items-center my-52">
      <ReactLoading type="spin" color="#F35E62" height={100} width={50} />
    </div>
  );
}
