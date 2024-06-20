export default function PromoCard({ title, img, description }) {
  return (
    <article className="flex flex-col gap-5 w-80">
      <img src={import.meta.env.VITE_STATIC_URL + img} width="100%" />
      <h2 className="text-xl font-semibold text-center">{title}</h2>
      <p className="text-center">{description}</p>
    </article>
  );
}
