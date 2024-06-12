import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div className="loading h-[90vh] flex justify-center items-center">
      <ReactLoading type="spin" color="#F35E62" height={100} width={50} />
    </div>
  );
}
