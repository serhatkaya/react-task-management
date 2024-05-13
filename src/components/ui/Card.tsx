const Card = ({ icon, title, children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-2 border-accent/20">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-placeholder text-xl font-bold mb-2">{title}</h3>
      <p>{children}</p>
    </div>
  );
};

export default Card;
