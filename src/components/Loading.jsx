import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div className="loading absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2">
      <ReactLoading type="spin" color="#F35E62" height={100} width={50} />
    </div>
  );
}
